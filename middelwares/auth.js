const jwt = require('jsonwebtoken')

exports.autenticarte = (req, res, next) => {
    const token = req.get('token')
    jwt.verify(token, process.env.JWT_WORD, (err, decoded) => {
        if (err) {
            return res.status(404).json({message: 'Sesión vencida'})
        }else {
            req.user = decoded.data
            next()
        }
    })
}

exports.nivelUsuario = (req, res) => {
    const id_nivel = req.user.id_nivel
    if (id_nivel === 1) {
        return res.status(200).json({message: 'Usuario Administrador'})
    }else{
        return res.status(401).json({message: 'Usuario con credenciales insuficientes'})
    }
}