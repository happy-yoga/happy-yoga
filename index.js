require('dotenv').config()
const express = require('express')

const morgan = require('morgan')
const helmet = require('helmet')
const pug = require('pug')

const app = express()

app.use(morgan('common'))
app.use(helmet())

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(process.env.PORT, () => {
  console.info(`application server started at port: ${process.env.PORT}`)
})
