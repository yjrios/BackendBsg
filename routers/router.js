const multer = require('multer')
const express = require('express')
const router = express.Router()

var storage = multer.diskStorage({
  destination: function (req, img, cb) {
    cb(null, '../../photos')
  },
  filename: function (req, img, cb) {
    const prefijounico  = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, prefijounico + img.originalname)
  }
})

var storage2 = multer.diskStorage({
  destination: function (req, img, cb) {
    cb(null, '../../photos')
  },
  filename: function (req, img, cb) {
    const prefijounico  = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, prefijounico + img.originalname)
  }
})

var upload = multer({ storage: storage })
var filexcel = multer({ storage: storage2 })

const controladorObtener = require('../controller/controladorObtener')
const controladorObtenerNiveles = require('../controller/obtenerNiveles')
const controladorObtenerUser = require('../controller/controladorObtenerUser')
const controladorRegistrar = require('../controller/controladorRegistrar')
const controladorEliminar = require('../controller/controladorEliminar')
const controladorEditar = require('../controller/controladorEditar')
const controladorLogin = require('../controller/controladorLogin')
const leerExcel = require('../controller/controladorDataexcel')

const authentic = require('../middelwares/auth')

router.get('/', controladorObtener.consultarAll)

router.get('/verify',[authentic.autenticarte, authentic.nivelUsuario])

router.get('/user/niveles', controladorObtenerNiveles.consultarNiveles)

router.get('/user/:username', controladorObtenerUser.consultarUser)

router.post('/cargadedocumento', [leerExcel.readexcel,leerExcel.inserciondatos])

router.post('/login', controladorLogin.ingresar)

router.post('/usernuevo', authentic.autenticarte, upload.single('img'), controladorRegistrar.add)

router.put('/user/:username', upload.single('img'), controladorEditar.actualizar)

router.delete('/user/:username', controladorEliminar.delete)


module.exports = router