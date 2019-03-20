const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/timetable-express-app')
const Events = mongoose.Schema({
  userId: String,
  startedAt: Number,
  duration: Number, 
  title: String
})

module.exports = mongoose.model('Events', Events)