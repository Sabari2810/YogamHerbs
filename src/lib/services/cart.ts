import sql from "mssql";
import { sqlConfig } from "../sql";
import { prisma } from "../prisma";

export async function getCartDetails(sessionId: string) {
    await sql.connect(sqlConfig);
    const request = new sql.Request()
    request.input("session_id", sql.VarChar, sessionId)
    const result = await request.execute("dbo.SP_GetCart")
    return result.recordset
}

export async function updateCartDetails(sessionId: string, productVariantId: number, value: number) {
    await sql.connect(sqlConfig);
    const request = new sql.Request()
    request.input("product_variant_id", sql.Int, productVariantId)
    request.input("session_id", sql.VarChar, sessionId)
    request.input("value", sql.Int, value)
    const result = await request.execute("dbo.SP_UpdateCartDetails")
    return result.recordset
}

export async function deleteCart(sessionId: string) {
    await sql.connect(sqlConfig);
    const request = new sql.Request()
    request.input("session_id", sql.VarChar, sessionId)
    const result = await request.execute("dbo.SP_DeleteCart")
    return result.recordset
}

export async function getCartCount(sessionId: string) {
    const productQuantity = await prisma.yH_Cart.findMany({
        where: {
            SessionId: sessionId
        },
        select: {
            Quantity: true
        }
    })

    const cartQuantity = productQuantity.reduce((total, cartItem) => total + cartItem.Quantity, 0)
    return cartQuantity;
}