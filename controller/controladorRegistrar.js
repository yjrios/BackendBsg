
const conexion = require('../conexion')
const bcrypt = require('bcrypt')
const saltos = 12



//########################### POST
exports.add = async(req, res) =>{
    const passwordencriptado = bcrypt.hashSync(req.body.password, saltos)
    const data = {
        username: req.body.username,
        password: passwordencriptado,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        id_nivel: req.body.nivel,
        cargo: req.body.cargo,
        img: req.file.filename
        }
    try {
        if(data){
        conexion.query('INSERT INTO USERS SET ?',[data], (error, resultado)=>{
            if(error){
               throw error
             }else{
            return res.json({mensaje: "registro exitoso"}).status(200)
            }
            })
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error'
        })
    }
}