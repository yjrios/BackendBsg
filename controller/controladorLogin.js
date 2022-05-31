const conexion = require('../conexion')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//########################### LOGIN
exports.ingresar = async(req, res) => {
    const data = req.body
    console.log('INGRESAR')
    try {
        if(data.username){
            console.log('IF data.username '+data.username)
            await conexion.query('SELECT * FROM USERS WHERE USERNAME = ?',[data.username], (error, resultado)=>{
                if(error){
                    return res.status(404).json({
                        mensaje: 'Ususario incorrecto'
                    })
                }
                if(resultado.length == 0){
                    return res.status(404).json({
                        mensaje: 'Ususario incorrecto'
                    })
                }

                if(!bcrypt.compareSync(data.password, resultado[0].password)) {
                    return res.status(400).json({
                        mensaje: 'Contraseña incorrecta'
                    })
                }
                //########################### ARRAY PARA NO ENVIAR EN EL TOKEN LAS CREDENCIALES
                const info = {username: resultado[0].username,
                nombres: resultado[0].nombres,
                apellidos: resultado[0].apellidos,
                cargo: resultado[0].cargo,
                img: resultado[0].img,
                nivel: resultado[0].nivel} 
                //########################### GENERAR TOKEN
                const token = jwt.sign( { data: info }, process.env.JWT_WORD,{expiresIn: process.env.JWT_VENCE * 60 * 24} )

                res.json({
                    info,
                    token
                })
            }) 
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
}