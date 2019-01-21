const express = require('express')
const router = express.Router()
// const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto')

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
  console.log(req.body, 'request')
  const password = sha512(req.body.password)
  const user = new User({
    email: req.body.email,
    password
  })
  await user.save()
  console.log('after await')
  res.status(200).json({
    success: "You've successfully signen up!"
  }).end()
})

module.exports = router