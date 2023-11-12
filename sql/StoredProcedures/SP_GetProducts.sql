CREATE OR ALTER PROCEDURE SP_GetProducts
(
	@page INT
)
AS
BEGIN
	
	WITH ProductData AS(
	SELECT
		m.Id as ProductId,
		m.Guid as ProductGuid,
		v.Id as VariantId,
		v.Guid as VariantGuid, 
		m.Title, 
		m.Descr as Description, 
		v.StockCount, 
		v.Price,
		CAST((
			CASE 
				WHEN LOWER(d.DiscountType) IN ('c') THEN v.Price - d.Value
				WHEN LOWER(d.DiscountType) IN ('d') THEN v.Price - ((d.Value / 100) * v.Price)
				ELSE NULL
			END
		) AS NUMERIC(18,2)) as DiscountPrice,
		d.Id as DiscountId,
		d.Value as DiscountValue
	FROM YH_ProductMaster m
	JOIN YH_ProductVariants v ON m.Id = v.ProductId_FK
	LEFT JOIN YH_DiscountMaster d ON d.Id = v.DiscountId_FK AND d.EffTo > GETDATE()
	WHERE v.Id IS NOT NULL AND v.IsDefault = 1
	ORDER BY m.CreatedDt ASC
	OFFSET (@page - 1) * 100 ROWS FETCH NEXT 100 ROWS ONLY)

	SELECT
		(SELECT * FROM ProductData FOR JSON PATH) AS products,
		(
			SELECT 
				CEILING(COUNT(M.Id) / 100.0) 
			FROM YH_ProductMaster m 
			JOIN YH_ProductVariants v ON m.Id = v.ProductId_FK
			WHERE v.IsDefault = 1
		) AS total_pages
END
