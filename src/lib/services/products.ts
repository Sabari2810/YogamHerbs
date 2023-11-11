import sql from "mssql";
import { sqlConfig } from "../sql";

export async function getProducts(page: number) {
    await sql.connect(sqlConfig)
    const request = new sql.Request()
    request.input("page", sql.Numeric, page)
    const result = await request.execute("dbo.SP_GetProducts")
    return result.recordset
}

export async function getProductVariants(productGuid: string) {
    await sql.connect(sqlConfig);
    const request = new sql.Request()
    request.input("product_guid", sql.VarChar, productGuid)
    const result = await request.execute("dbo.SP_GetProductVariants")
    return result.recordset
}