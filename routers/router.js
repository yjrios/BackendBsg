const express = require('express')
const router = express.Router()

const controlador = require('../controller/controlador')

router.get('/', controlador.consultarAll)

router.get('/user/:correo', controlador.consultarUser)

router.post('/usernuevo', controlador.registrar)

router.post('/login', controlador.ingresar)

router.put('/user/:correo', controlador.actualizar)

router.delete('/user/:correo', controlador.eliminar)


module.exports = router