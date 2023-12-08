CREATE OR ALTER FUNCTION func_GetVariantPrice
(
	@variant_id INT
)
RETURNS NUMERIC(18,2)
BEGIN
	DECLARE @result NUMERIC(18,2) 
	SELECT 
	@result = CAST(IIF(ISNULL(discount.id,0) =  0, variant.price, variant.price - ((discount.value / 100) * variant.price)) AS NUMERIC(18,2))
	FROM YH_ProductVariants variant
	LEFT JOIN YH_DiscountMaster discount ON variant.DiscountId_FK = discount.id
	WHERE variant.id = @variant_id

	RETURN @result
END

