const saltos = 12
const _ = require('underscore')
const bcrypt = require('bcrypt')
const conexion = require('../conexion')

//########################### PUT
exports.actualizar = async(req,res) => {
    const username = req.params.username
    if(req.file){
        req.body.img = req.file.filename
    }
    const data = _.pick(req.body, ['nombres', 'apellidos', 'cargo', 'img', 'password', 'id_nivel'])
    if(data.password){
        data.password = bcrypt.hashSync(data.password, saltos)
    }
    try {
        if(username){
            await conexion.query(`UPDATE USERS SET ? WHERE USERNAME = '${username}'`, data,(error, result)=>{
                if(error){throw error//(error || result.length == 0){
                    // return res.status(404).json({
                    //     success: false,
                    //     mensaje: "ERROR DDBB",
                    //     error
                    // }) 
                }else{
                    return res.json({mensaje: "Actualizacion Exitosa"})
                }
            })
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error'
        })
    }

}