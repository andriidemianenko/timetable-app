const express = require('express')
const routes = require('./api/routes/index')
const bodyParser = require('body-parser')

const app = express()

const PORT = 5000

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
