CREATE OR ALTER PROCEDURE SP_GetProductVariants
(
	@product_guid UNIQUEIDENTIFIER
)
AS
BEGIN
	SELECT
	m.id as product_id,
	m.guid as product_guid,
	v.id as product_variant_id,
	v.guid as product_variant_guid,
	m.title, 
	m.description,
	v.price,
	(
		CASE
			WHEN d.discount_type IN ('d') THEN v.price - ((d.value / 100) * v.price)
			ELSE NULL
		END
	) as discount_price,
	d.value as discount_value,
	v.unit,
	v.volume,
	v.is_default
	FROM ProductMaster m
	JOIN ProductVariants v ON m.id = v.product_id
	LEFT JOIN DiscountMaster d ON d.id = v.discount_id
	WHERE m.guid = @product_guid
END
