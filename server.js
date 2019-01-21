const express = require('express')
const routes = require('./api/routes/index')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const PORT = 5000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
