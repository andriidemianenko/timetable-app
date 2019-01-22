const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/timetable-express-app')
const User = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('User', User)