import mysql from 'mysql2/promise.js';

const caCertificate = process.env.MYSQL_SSL_CA?.replace(/\\n/g, '\n');

const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

console.log("Api conectada com Mysql com sucesso")

export default con;
