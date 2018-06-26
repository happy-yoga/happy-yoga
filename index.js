const express = require('express')

const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

app.use(morgan())
app.use(helmet())

app.listen(process.env.PORT, () => {
  console.info(`application server started at port: ${process.env.PORT}`)
})
