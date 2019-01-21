const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const salt = 'someSaltString'

const sha512 = password => {
  const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return value
}

router.get('/', (req, res) => {
  res.send('Welcome on a homepage')
})

router.get('/timetable', (req, res) => {
  res.send('Here is your timetable!')
})

router.post('/signup', async (req, res) => {
  const password = sha512(req.body.password)
  const user = new User({
    email: req.body.email,
    password
  })
  await user.save()
  res.status(200).json({
    success: "You've successfully signen up!"
  }).end()
})

router.post('/signin', async (req, res) => {
  const incPassword = sha512(req.body.password)
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    if (user.password === incPassword) {
      res.status(200).json({
        success: "You've successfully logged in!"
      })
    } else {
      res.status(401).json({
        error: "Invalid login or password!"
      })
    }
  } else {
    res.status(401).json({
      error: "Invalid login or password!"
    })
  }
})

module.exports = router