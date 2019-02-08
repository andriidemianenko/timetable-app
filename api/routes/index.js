const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const salt = 'someSaltString'
const secret = 'secret'

const sha512 = password => {
  const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return value
}

router.get('/', (req, res) => {
  res.send('Welcome on a homepage')
})

router.get('/timetable/user/:userId', (req, res) => {
  res.json({
    message: `Welcome user ${req.params.userId}!`,
    events: [
      {
        startedAt: 15,
        duration: 30,
        title: 'Some event#1'
      },
      {
        startedAt: 15,
        duration: 30,
        title: 'Some event#2'
      },
      {
        startedAt: 15,
        duration: 30,
        title: 'Some event#3'
      },
      {
        startedAt: 15,
        duration: 30,
        title: 'Some event#4'
      }
    ]
  })
})

router.post('/signup', async (req, res) => {
  const password = sha512(req.body.password)
  const user = new User({
    email: req.body.email,
    password
  })
  await user.save()
  res.status(200).json({
    success: "You've successfully signed up! You can signin now!",
  }).end()
})

router.post('/signin', async (req, res) => {
  const incPassword = sha512(req.body.password)
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    if (user.password === incPassword) {
      const JWTToken = jwt.sign({
          email: user.email,
          _id: user._id
        },
        secret,
        {
          expiresIn: '1m'
        })
        return res.status(200).json({
          success: 'Welcome to the JWT Auth',
          token: JWTToken,
          id: user._id
        })
    } else {
      res.status(401).json({
        error: 'Invalid login or password!'
      })
    }
  } else {
    res.status(401).json({
      error: 'Invalid login or password!'
    })
  }
})

router.post('/auth', async (req, res) => {
  const token = req.body.token
  const decoded = jwt.decode(token)
  console.log(decoded)
  if (!token) {
    res.status(401).json({
      status: 'You are not logged in!'
    })
  } else {
    try {
      await jwt.verify(token, secret)
      res.status(200).json({
        email: decoded.email,
        userId: decoded._id,
        isAuthorized: true
      })
    } catch(error) {
      res.status(401).json({
        email: '',
        userId: '',
        isAuthorized: false
      })
    }
  }
})
module.exports = router