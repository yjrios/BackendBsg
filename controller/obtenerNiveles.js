const conexion = require('../conexion')

exports.consultarNiveles = async (req,res) =>{
    sql = 'SELECT * FROM SEGURIDAD'
    console.log('SEGURIDAD')
    try{
        console.log('SEGURIDAD 2')
        await conexion.query(sql, (error, result)=>{
            if (error) {
                console.log('ERROR '+error)
            }else{
                console.log('SEGURIDAD3')
                return res.json(result).status(200)
            }
        })
    }catch(erro){
        console.log('ERROR '+erro)
    }

}