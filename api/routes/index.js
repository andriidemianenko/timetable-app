const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome on a homepage')
})

router.get('/timetable', (req, res) => {
  res.send('Here is your timetable!')
})

router.get('/registration', (req, res) => {
  res.json({
    "Check" : "The application works"
  })
})

module.exports = router