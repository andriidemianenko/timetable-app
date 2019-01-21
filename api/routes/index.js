const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome on a homepage')
})

router.get('/checking', (req, res) => {
  res.json({
    "Check" : "The application works"
  })
})

module.exports = router