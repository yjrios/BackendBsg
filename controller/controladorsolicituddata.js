const conexion = require('../conexion')

exports.getrangeone = async (req, res, next) => {
    const reqfechas = req.get('fechas')
    const fechas = JSON.parse(reqfechas)
    sql = `SELECT * FROM DOCUMENTOS WHERE FECHA_FACTURA BETWEEN '${fechas.fecha1d}' AND '${fechas.fecha1h}'`
    try {
        await conexion.query(sql, (err, rangeone) => {
            if (err) {
                throw err
            }else{
                req.rangeone = rangeone
                next()
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getrangetwo = async (req, res) => {
    const reqfechas = req.get('fechas')
    const fechas = JSON.parse(reqfechas)
    sql = `SELECT * FROM DOCUMENTOS WHERE FECHA_FACTURA BETWEEN '${fechas.fecha2d}' AND '${fechas.fecha2h}'`
    try {
        await conexion.query(sql, (err, rangetwo) => {
            if (err) {
                throw err
            }else{
                return res.json({
                    rangetwo: rangetwo,
                    rangeone: req.rangeone
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}