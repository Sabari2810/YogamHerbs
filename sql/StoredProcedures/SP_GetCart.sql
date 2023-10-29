CREATE OR ALTER PROCEDURE SP_GetCart
(
	@session_id VARCHAR(150)
)
AS
BEGIN
	SELECT 
		*,
		(
			CASE
				WHEN ISNULL(tbl.discount_price,0) <> 0 THEN CAST(tbl.discount_price * tbl.quantity AS NUMERIC(18,2))
				ELSE tbl.price * tbl.quantity
			END
		) as total_price
	FROM
	(SELECT 
		m.title,
		v.guid as product_variant_guid,
		v.id as product_variant_id,
		m.id as product_id,
		m.guid as product_guid,
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
		c.quantity
	FROM Cart c
	JOIN ProductVariants v ON c.product_variant_id = v.id
	JOIN ProductMaster m ON m.id = v.product_id
	LEFT JOIN DiscountMaster d ON d.id = v.discount_id
	WHERE c.session_id = @session_id) AS tbl
END