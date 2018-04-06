const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('../config')
const app = express()

mongoose.connect(config.db.url)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

require('./routes')(app)

app.listen(config.port)
console.log('All set on port', config.port)
