import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "datphong",
    connectionLimit: 10,
    connectTimeout: 1000,
    waitForConnections: true,
    queueLimit: 0
})