const conexion = require('../conexion')

exports.listardata = async (req, res) => {
    const reqfechas = req.get('fechas')
    const fechas = JSON.parse(reqfechas)
    sql = `SELECT * FROM DOCUMENTOS WHERE FECHA_FACTURA BETWEEN '${fechas.desde}' AND '${fechas.hasta}'`
    try {
        await conexion.query(sql, (error, result)=>{
            if (error){
                throw error
            }else{
                return res.json(result)
            }
        })
    } catch (error) {
        return res.status(500)
    }
}