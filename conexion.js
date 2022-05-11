const mysql = require('mysql')
require('dotenv').config()

const conexion = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD
})

conexion.connect( (error) => {
    if(error) {console.log(error)}

    console.log('Conexion Up')
})

module.exports = conexion