import mysql from 'mysql2/promise.js';
const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER ,
    password: process.env.MYSQL_PASSWRD ,
    database: process.env.MYSQL_DATABASE
})

console.log("Api conectada com Mysql com sucesso")

export default con;