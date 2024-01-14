import sql from "mssql";
import { sqlConfig } from "../sql";

export async function CreatePayment(payment_details: string) {
    await sql.connect(sqlConfig);
    const request = new sql.Request()
    request.input("payment_details", sql.NVarChar, payment_details)
    const result = await request.execute("dbo.SP_CreatePayment")
    return result.recordset
}