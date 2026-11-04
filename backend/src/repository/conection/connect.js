import mysql from 'mysql2/promise.js';

const caCertificate = process.env.MYSQL_SSL_CA?.replace(/\\n/g, '\n');

const con = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: {
        ca: caCertificate,
        rejectUnauthorized: true
    }
});

await con.query('SELECT 1');
console.log("Api conectada com Mysql com sucesso")

export default con;
