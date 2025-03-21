CREATE OR ALTER PROCEDURE SP_CreateOrder
(
	@session_id UNIQUEIDENTIFIER
)
AS
BEGIN

	SELECT 
		variant.id as variant_id,
		variant.price as variant_price,
		CAST(dbo.func_GetVariantPrice(variant.id) AS NUMERIC(18,2)) as item_price,
		CAST(dbo.func_GetVariantPrice(variant.id) * cart.quantity AS NUMERIC(18,2)) as total_price,
		cart.quantity,
		discount.id as discount_id,
		discount.value as discount_price
	INTO #OrderDetails
	FROM YH_CART cart
	JOIN YH_ProductVariants variant ON cart.ProductVariantId_FK = variant.id
	LEFT JOIN YH_DiscountMaster discount ON discount.id = variant.DiscountId_FK AND discount.DiscountType <> 'C'
	WHERE SessionId = @session_id

	-- CREATE ORDER
	INSERT INTO YH_Orders (TotalPrice , StatusId_FK ) VALUES (
		(SELECT SUM(total_price) FROM #OrderDetails),
		(SELECT TOP 1 id FROM YH_OrderStatus WHERE Status = 'TODO')
	)

	DECLARE @order_id INT
	SELECT @order_id = SCOPE_IDENTITY()

	--INSERT ORDER ITEMS
	INSERT INTO YH_OrderItem (OrderId_FK, ItemDiscountedPrice, ItemPrice, ItemDiscount, TotalPrice, Quantity, ProductVariantId_FK, DiscountId)
	SELECT @order_id,item_price, variant_price, discount_price, total_price, quantity, variant_id, discount_id FROM #OrderDetails

	SELECT id as OrderId, guid as OrderGuid, TotalPrice FROM YH_Orders WHERE id = @order_id
END


