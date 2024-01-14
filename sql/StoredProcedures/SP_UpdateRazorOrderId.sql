CREATE OR ALTER PROCEDURE SP_UpdateRazorOrderId
(
	@order_id INT,
	@razor_order_id VARCHAR(100)
)
AS
BEGIN
	UPDATE YH_Orders
	SET RazorOrderId = @razor_order_id
	WHERE Id = @order_id
END