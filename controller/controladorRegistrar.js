
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
                    return res.status(400)
                }else{
                    return res.json({mensaje: "registro exitoso"}).status(200)
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error'
        })
    }
}


exports.verificarEmail = async(req, res, next) =>{
    console.log('REQ '+req.body.username)
    sql = `SELECT * FROM USERS WHERE USERNAME = '${req.body.username}'`
    try {
        conexion.query(sql, (error, resultado)=>{
            if(error){
               throw error
            }else{
                console.log('REQ else')
                if (resultado.length !== 0){
                    console.log('RESULTADO 0')
                    return res.status(401).json({message: 'Uuario existe'})
                }else{ 
                    console.log('NEXT')
                    next()
                }
            }
        })
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error'
        })
    }
}