const conexion = require('../conexion')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltos = 12
const _ = require('underscore')

//########################### GET ALL
exports.consultarAll = async(req, res) =>{
    try {
        conexion.query('SELECT * FROM USERS', (error, resultado) => {
            if(error){
                res.status(404).json({
                    success: false,
                    mensaje: "Error en DDBB",
                    error
                })
            }else{
                res.json({
                mensaje: "Consulta exitosa",
                data: resultado
                })
            }
        })
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
}
//########################### GET CORREO
exports.consultarUser = async(req, res) =>{
    const correo = req.params.correo
    try {
        if(correo){
            conexion.query('SELECT * FROM USERS WHERE USERNAME = ?',[correo], (error, resultado)=>{
                if(error || resultado.length == 0){
                    res.status(404).json({
                        mensaje: "Error en DDBB, USUARIO NO EXISTE"
                        })
                }else{
                    res.json({
                        mensaje: "Consulta Exitosa",
                        data: resultado
                    })
                }
            })
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
}
//########################### POST
exports.registrar = async(req, res) =>{
    const data = req.body
    const passwordencriptado = bcrypt.hashSync(data.password, saltos)
    try {
        if(data){
            await conexion.query('INSERT INTO USERS SET ?',{username: data.correo, password: passwordencriptado, nivel: data.nivel}, (error, resultado)=>{
                if(error){
                    res.status(404).json({
                        success: false,
                        mensaje: "Error en DDBB",
                        error
                    })
                }
                return res.json({
                    data: resultado,
                    mensaje: "registro exitoso"
                })  
            })
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error'
        })
    }
}
//########################### DELETE
exports.eliminar = async(req,res) =>{
    const cuenta = req.params.correo
    try {
        if(id !== 0){
            conexion.query('DELETE FROM USERS WHERE ID = ?',[cuenta], (error, resultado)=>{
                if(error){
                    res.status(404).json({
                        success: false,
                        mensaje: "ERROR DDBB",
                        error
                    })
                }
                return res.json({
                    mensaje: "Eliminacion exitosa",
                    data: resultado
                })
            })
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error'
        })
    }

}
//########################### PUT
exports.actualizar = async(req,res) =>{
    const correo = req.params.correo
    const data = _.pick(req.body, ['nombres', 'apellidos', 'cargo', 'img', 'password'])
    if(data.password){
        data.password = bcrypt.hashSync(data.password, saltos)
    }
    try {
        if(correo){
                conexion.query('UPDATE USERS SET ? WHERE USERNAME = ?', [{password: data.password, nombres: data.nombres, apellidos: data.apellidos, cargo: data.cargo, img: data.img}, correo],(error, result)=>{
                if(error || result.length == 0){
                    res.status(404).json({
                        success: false,
                        mensaje: "ERROR DDBB",
                        error
                    })
                }
                return res.json({
                    mensaje: "Actualizacion Exitosa",
                    data: result
                })
            })
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error'
        })
    }

}
//########################### LOGIN
exports.ingresar = async(req, res) => {
    const data = req.body
    try {
        if(data.username){
            conexion.query('SELECT * FROM USERS WHERE USERNAME = ?',[data.username], (error, resultado)=>{
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
                const info = {correo: resultado[0].username,
                nombres: resultado[0].nombres,
                apellidos: resultado[0].apellidos,
                cargo: resultado[0].cargo,
                img: resultado[0].img,
                nivel: resultado[0].nivel} 
                //########################### GENERAR TOKEN
                const token = jwt.sign( { data: info }, 'LOMEJORJESUS',{expiresIn: process.env.JWT_VENCE * 60 * 24} )

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