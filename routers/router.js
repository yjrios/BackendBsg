const express = require('express')
const router = express.Router()

const controladorObtener = require('../controller/controladorObtener')
const controladorObtenerUser = require('../controller/controladorObtenerUser')
const controladorRegistrar = require('../controller/controladorRegistrar')
const controladorEliminar = require('../controller/controladorEliminar')
const controladorEditar = require('../controller/controladorEditar')
const controladorLogin = require('../controller/controladorLogin')

router.get('/', controladorObtener.consultarAll)

router.get('/user/:correo', controladorObtenerUser.consultarUser)

router.post('/usernuevo', controladorRegistrar.add)

router.post('/login', controladorLogin.ingresar)

router.put('/user/:correo', controladorEditar.actualizar)

router.delete('/user/:correo', controladorEliminar.delete)


module.exports = router