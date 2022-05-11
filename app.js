const morgan = require('morgan')
const express = require('express')
const myconnection = require('express-myconnection')
const path = require('path')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const dotenv = require('dotenv')
const app = express()


app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', require('./routers/router.js'))
app.use(history())
dotenv.config({path: `.env`})

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log('Port active', app.get('port'))
})
