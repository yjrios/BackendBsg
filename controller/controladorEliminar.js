const conexion = require('../conexion')

//########################### DELETE
exports.delete = async(req,res) =>{
    const username = req.params.username
    try {
        if(username){
            console.log('dentro de if username')
            await conexion.query('DELETE FROM USERS WHERE USERNAME = ?', username, (error, resultado)=>{
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