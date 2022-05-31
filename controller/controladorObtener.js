const conexion = require('../conexion')

//########################### GET ALL
exports.consultarAll = async(req, res) =>{
    try {
        await conexion.query('SELECT * FROM USERS', (error, resultado) => {
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