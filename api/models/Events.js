const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/timetable-express-app')
const Events = mongoose.Schema({
  userId: String,
  startedAt: String,
  duration: String, 
  title: String
})

module.exports = mongoose.model('Events', Events)