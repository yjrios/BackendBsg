const conexion = require('../conexion')

//########################### DELETE
exports.delete = async(req,res) =>{
    const cuenta = req.params.username
    try {
        if(cuenta !== 0){
            await conexion.query('DELETE FROM USERS WHERE ID = ?',[cuenta], (error, resultado)=>{
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