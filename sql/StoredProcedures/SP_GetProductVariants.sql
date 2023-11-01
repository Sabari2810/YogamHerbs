CREATE OR ALTER PROCEDURE SP_GetProductVariants
(
	@product_guid UNIQUEIDENTIFIER
)
AS
BEGIN
	SELECT
	m.Id as ProductId,
	m.Guid as ProductGuid,
	v.Id as ProductVariantId,
	v.Guid as ProductVariantGuid,
	m.Title, 
	m.Descr as Description,
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
	v.IsDefault
	FROM YH_ProductMaster m
	JOIN YH_ProductVariants v ON m.Id = v.ProductId_FK
	LEFT JOIN YH_DiscountMaster d ON d.id = v.DiscountId_FK
	WHERE m.Guid = @product_guid
END
