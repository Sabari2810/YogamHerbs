import sql from "mssql";
import { sqlConfig } from "../sql";

export async function createOrder(session_id: string) {
    await sql.connect(sqlConfig)
    const request = new sql.Request()
    request.input("session_id", sql.NVarChar, session_id)
    const result = await request.execute("dbo.SP_CreateOrder")
    return result.recordset[0]
}

export async function updateRazorOrderId(order_id: number, razor_order_id: string) {
    await sql.connect(sqlConfig)
    const request = new sql.Request()
    request.input("order_id", sql.Int, order_id)
    request.input("razor_order_id", sql.VarChar, razor_order_id)
    const result = await request.execute("dbo.SP_UpdateRazorOrderId")
}