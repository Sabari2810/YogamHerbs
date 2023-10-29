CREATE OR ALTER PROCEDURE SP_GetProducts
AS
BEGIN
	SELECT
		m.id as product_id,
		m.guid as product_guid,
		v.id as variant_id,
		v.guid as variant_guid, 
		m.title, 
		m.description, 
		v.in_stocks, 
		v.price,
		(
			CASE 
				WHEN d.discount_type IN ('c') THEN v.price - d.value
				WHEN d.discount_type IN ('d') THEN v.price - ((d.value / 100) * v.price)
				ELSE NULL
			END
		) as discount_price,
		d.id as discount_id,
		d.value as discount_value
	FROM ProductMaster m
	JOIN ProductVariants v ON m.id = v.product_id
	LEFT JOIN DiscountMaster d ON v.discount_id = d.id AND d.eff_to > GETDATE()
	WHERE v.id IS NOT NULL and v.is_default = 1
END
