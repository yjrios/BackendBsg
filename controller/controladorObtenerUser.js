const conexion = require('../conexion')

//########################### GET CORREO
exports.consultarUser = async(req, res) =>{
    const correo = req.params.username
    try {
        if(correo){
            await conexion.query('SELECT * FROM USERS WHERE USERNAME = ?',[correo], (error, resultado)=>{
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