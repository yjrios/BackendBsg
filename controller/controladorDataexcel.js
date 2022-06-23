const conexion = require('../conexion')

exports.readexcel = async (req, res, next) => {
    
    const sqlverificar = 'SELECT * FROM DOCUMENTOS WHERE NRO_UNICO = ?'
    const archivo = req.body.data
    const cabecera = archivo[0]
    let cellnroFactura = null
    let cellmaterial = null
    
    for(let celda = 0; celda <= cabecera.length; celda++) {
        if (cabecera[celda] === "Nro.Factura"){
            cellnroFactura = celda
        }
        if (cabecera[celda] === "Material") {
            cellmaterial = celda
        }
    }
    var trueFalse = 0
    if (cellnroFactura && cellmaterial) {
            for(let row = 1;row <= archivo.length-1; row++){
            let nro_Unico = archivo[row][cellnroFactura] + archivo[row][cellmaterial]
                await conexion.query(sqlverificar, nro_Unico, (error, result) => {
                    if (error) {throw error}
                        
                    if (result.length != 0){
                        trueFalse = 1
                    }
                    if ( row === (archivo.length-1) && trueFalse === 0 ){
                        next()
                    }
                    if (row === (archivo.length-1) && trueFalse === 1) {
                        return res.status(400).json(result)
                    }
                })
            }
    }
} 
exports.inserciondatos = async (req,res) => {

    const sql = 'INSERT INTO DOCUMENTOS SET ?'
    const archivo = req.body.data
    const cabecera = archivo[0]
    let cellnroFactura = null
    let cellmaterial = null

    for(let celda = 0; celda <= cabecera.length - 1; celda++) {
        if (cabecera[celda] === "Nro.Factura"){
            cellnroFactura = celda
        }
        if (cabecera[celda] === "Material") {
            cellmaterial = celda
        }
    }
    for(let row = 1; row <= archivo.length-1; row++) {
        let nro_Unico = archivo[row][cellnroFactura] + archivo[row][cellmaterial]
        archivo[row].unshift(nro_Unico)
        let cell = 0
        let payload = {
            nro_Unico: archivo[row][cell],
            cliente: archivo[row][cell+1],
            fecha_Factura: archivo[row][cell+2],
            org_Ventas: archivo[row][cell+3],
            canal_Distrib: archivo[row][cell+4],
             sector: archivo[row][cell+5],
             clase_Fact: archivo[row][cell+6],
             Nro_Factura: archivo[row][cell+7],
            Material: archivo[row][cell+8],
            oficina_Ventas: archivo[row][cell+9],
            centro: archivo[row][cell+10],
            precio_Unitario: archivo[row][cell+11],
            nro_Lote: archivo[row][cell+12],
            txt_Pos: archivo[row][cell+13],
            cant_Facturada: archivo[row][cell+14],
            unMed_Vta: archivo[row][cell+15],
            precioNeto_Pos: archivo[row][cell+16],
            post_Fact: archivo[row][cell+17],
            nombre1: archivo[row][cell+18],
            nombre2: archivo[row][cell+19]
         }
        conexion.query(sql, payload, (err, resul) => {
            if(err){
                throw err
            }else{
                if (row === (archivo.length-1)){
                    return res.json(resul)
                }
            }
        })
    }
}
