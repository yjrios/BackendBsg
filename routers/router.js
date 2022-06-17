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
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const prefijounico  = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, prefijounico + file.originalname)
  }
})

var loadfile = multer({ storage: storage2 })

var upload = multer({ storage: storage })



const controladorObtener = require('../controller/controladorObtener')
const controladorObtenerNiveles = require('../controller/obtenerNiveles')
const controladorObtenerUser = require('../controller/controladorObtenerUser')
const controladorRegistrar = require('../controller/controladorRegistrar')
const controladorEliminar = require('../controller/controladorEliminar')
const controladorEditar = require('../controller/controladorEditar')
const controladorLogin = require('../controller/controladorLogin')
const controladorFiles = require('../controller/documents')

const authentic = require('../middelwares/auth')

router.get('/', controladorObtener.consultarAll)

router.get('/verify',[authentic.autenticarte, authentic.nivelUsuario])

router.get('/user/niveles', controladorObtenerNiveles.consultarNiveles)

router.get('/user/:username', controladorObtenerUser.consultarUser)

router.get('/leerarchivoexcel/:fecha', controladorFiles.readfile)

router.post('/usernuevo', authentic.autenticarte, upload.single('img'), controladorRegistrar.add)

router.post('/cargadedocumento', loadfile.single('file'), controladorFiles.addfile)

router.post('/login', controladorLogin.ingresar)

router.put('/user/:username', upload.single('img'), controladorEditar.actualizar)

router.delete('/user/:username', controladorEliminar.delete)


module.exports = router