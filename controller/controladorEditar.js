const _ = require('underscore')
const bcrypt = require('bcrypt')
const conexion = require('../conexion')

//########################### PUT
exports.actualizar = async(req,res) =>{
    const correo = req.params.correo
    const data = _.pick(req.body, ['nombres', 'apellidos', 'cargo', 'img', 'password'])
    if(data.password){
        data.password = bcrypt.hashSync(data.password, saltos)
    }
    try {
        if(correo){
                await conexion.query('UPDATE USERS SET ? WHERE USERNAME = ?', [{password: data.password, nombres: data.nombres, apellidos: data.apellidos, cargo: data.cargo, img: data.img}, correo],(error, result)=>{
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