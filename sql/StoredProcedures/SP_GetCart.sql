CREATE OR ALTER PROCEDURE SP_GetCart
(
	@session_id VARCHAR(150)
)
AS
BEGIN
	SELECT 
		*,
		CAST((
			CASE
				WHEN ISNULL(tbl.DiscountPrice,0) <> 0 THEN CAST(tbl.DiscountPrice * tbl.quantity AS NUMERIC(18,2))
				ELSE tbl.Price * tbl.quantity
			END
		) AS NUMERIC(18,2)) as TotalPrice
	FROM
	(SELECT 
		m.Title,
		v.guid as ProductVariantGuid,
		v.id as ProductVariantId,
		m.id as ProductId,
		m.guid as ProductGuid,
		v.Price,
		CAST((
			CASE
				WHEN LOWER(d.DiscountType) IN ('d') THEN v.Price - ((d.Value / 100) * v.Price)
				ELSE NULL
			END
		) AS NUMERIC(18,2)) as DiscountPrice,
		d.value as DiscountValue,
		v.MeasurementUnit as Unit,
		v.Volume,
		c.Quantity
	FROM YH_Cart c
	JOIN YH_ProductVariants v ON c.ProductVariantId_FK = v.Id
	JOIN YH_ProductMaster m ON m.Id = v.ProductId_FK
	LEFT JOIN YH_DiscountMaster d ON d.Id = v.DiscountId_FK
	WHERE c.SessionId = @session_id) AS tbl
END