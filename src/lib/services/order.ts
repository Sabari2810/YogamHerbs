import sql from "mssql";
import { sqlConfig } from "../sql";

export async function createOrder(session_id: string) {
    await sql.connect(sqlConfig)
    const request = new sql.Request()
    request.input("session_id", sql.NVarChar, session_id)
    const result = await request.execute("dbo.SP_CreateOrder")
    return result.recordset[0]
}