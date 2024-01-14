CREATE OR ALTER PROCEDURE SP_DeleteCart
(
	@session_id VARCHAR(100)
)
AS
BEGIN
	DELETE FROM YH_Cart
	WHERE SessionId = @session_id
END