import { config } from "mssql";

export const sqlConfig: config = {
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PWD ?? "",
    database: process.env.DB_NAME ?? "",
    server: process.env.DB_SERVER ?? "",
    options: {
        trustServerCertificate: true, // change to true for local dev / self-signed certs
        trustedConnection: true
    }
}