const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/timetable-express-app')
const Events = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  startedAt: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Events', Events)