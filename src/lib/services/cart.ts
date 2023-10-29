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

export async function getCartCount(sessionId: string) {
    const productQuantity = await prisma.cart.findMany({
        where: {
            session_id: sessionId
        },
        select: {
            quantity: true
        }
    })

    console.log(productQuantity)

    const cartQuantity = productQuantity.reduce((total, cartItem) => total + cartItem.quantity, 0)
    return cartQuantity;
}