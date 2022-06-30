const jwt = require('jsonwebtoken')

exports.sesionactiva = (req, res, next) => {
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

exports.nivel = (req, res, next) => {
    const id_nivel = req.user.id_nivel
    if (id_nivel === 1) {
        next()
    }else{
        return res.status(401).json({message: 'Usuario con credenciales insuficientes'})
    }
}