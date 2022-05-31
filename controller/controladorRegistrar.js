// const multer = require('multer')
const conexion = require('../conexion')
const bcrypt = require('bcrypt')
const saltos = 12


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../uploads')
//     },
//     filename: function (req, file, cb) {
//       const prefijounico  = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, prefijounico + file.originalname)
//     }
//   })
  
//   var upload = multer({ storage: storage })
 
//########################### POST
exports.add = async(req, res) =>{
    const data = req.body
    const passwordencriptado = bcrypt.hashSync(data.password, saltos)
    try {
        // upload.single('req.files.img')
        if(data){
            conexion.query('INSERT INTO USERS SET ?',{username: data.username, password: passwordencriptado, nivel: data.nivel, nombres: data.nombres,apellidos: data.apellidos, cargo: data.cargo, img: data.img.name}, async (error, resultado)=>{
                if(error){
                    await res.status(404).json({
                        success: false,
                        mensaje: "Error en DDBB",
                        error
                    })
                }else{
                // const info = {username: resultado[0].username,
                //     nombres: resultado[0].nombres,
                //     apellidos: resultado[0].apellidos,
                //     cargo: resultado[0].cargo,
                //     img: resultado[0].img,
                //     nivel: resultado[0].nivel}

                return await res.json({mensaje: "registro exitoso"}).status(201)
                }
            })
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error'
        })
    }
}