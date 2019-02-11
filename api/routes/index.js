const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Events = require('../models/Events')

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

router.post('/timetable/user/:userId', async (req, res) => {
  const id = req.params.userId
  const event = new Events({
    userId: id,
    startedAt: req.body.startedAt,
    duration: req.body.duration, 
    title: req.body.title
  })
  await event.save()
  res.status(200).json(event)
})

router.post('/timetable/user/:userId/upload', async (req, res) => {
  const fileData = req.files.file.data.toString('utf-8')
  const timetable = JSON.parse(fileData)
  for (let i = 0; i < timetable.events.length; i++) {
    const event = new Events({
      userId: req.params.userId,
      startedAt: timetable.events[i].startedAt,
      duration: timetable.events[i].duration,
      title: timetable.events[i].title
    })
    await event.save()
  }
  const events = await Events.find({ userId: req.params.userId })
  res.status(200).json({ events }).end()
})

router.delete('/timetable/user/:userId', async (req, res) => {
  await Events.deleteOne({ _id : req.body.id })
  res.status(200).end()
})

router.get('/timetable/user/:userId', async (req, res) => {
  const userEvents = await Events.find({ userId: req.params.userId })
  res.status(200).json({
    message: `Welcome user ${req.params.userId}!`,
    events: userEvents
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
          expiresIn: '4m'
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