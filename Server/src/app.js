const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/kcart')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

require('./routes')(app)

app.listen(process.env.PORT || 3000)
