const conexion = require('../conexion')

exports.consultarNiveles = async (req,res) =>{
    sql = 'SELECT * FROM SEGURIDAD'
    try{
        await conexion.query(sql, (error, result)=>{
            if (error) {
                throw error
            }else{
                return res.json(result).status(200)
            }
        })
    }catch(erro){
        console.log('ERROR '+erro)
    }

}