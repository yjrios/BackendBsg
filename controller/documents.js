const conexion = require('../conexion')
const XLSX = require('xlsx')

exports.addfile = async (req, res) => {
     sql = 'INSERT INTO DOCUMENTOS SET ?'
     if (req.body){
         body = {
            fchIni: req.body.fchIni,
            fchFin: req.body.fchFin,
            direccionfile: req.file.filename
        }
    }
    try {
        conexion.query(sql, body, (err,result) => {
           if( err ){
               return res.status(404)
            }else{
                return res.status(200).json(result)
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

exports.readfile = async (req, res) => {
    if (req.params.fecha) {
        sql = `SELECT DIRECCIONFILE FROM DOCUMENTOS WHERE FCHINI <= '${req.params.fecha}' AND FCHFIN >= '${req.params.fecha}'`
        try {
            await conexion.query(sql, (err,result) => {
                if (err) {
                    throw err
                    //res.status(404)
                }else{
                    const archivo = XLSX.readFile(`${process.env.AQUI}${result[0].DIRECCIONFILE}`)
                    const hojas = archivo.SheetNames
                    hojas.forEach(element => {
                        const datos = XLSX.utils.sheet_to_json(archivo.Sheets[element])
                        // datos.map(ele => {
                        //     console.log(ele['Nro.Factura'])
                        // })
                        return res.json(datos)
                    });
                }
            })
        } catch (error) {
            res.status(500)
        }
    }
}