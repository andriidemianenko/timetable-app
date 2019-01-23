const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/timetable-express-app')
const Timetable = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  events: [{ startedAt: Number, duration: Number, title: String }]
})

module.exports = mongoose.model('Timetable', Timetable)