CREATE OR ALTER PROCEDURE SP_UpdateCartDetails
(
	@product_variant_id INT,
	@session_id VARCHAR(100),
	@value INT
)
AS
BEGIN
	IF EXISTS(SELECT 'X' FROM YH_Cart WHERE SessionId = @session_id AND ProductVariantId_FK = @product_variant_id)
	BEGIN
		UPDATE YH_Cart SET Quantity = Quantity + @value, ModifiedDt = GETDATE()
		WHERE SessionId = @session_id AND ProductVariantId_FK = @product_variant_id
	END
	ELSE
	BEGIN
		INSERT INTO YH_Cart (SessionId,ProductVariantId_FK,Quantity)
		VALUES (@session_id,@product_variant_id,@value)
	END
END