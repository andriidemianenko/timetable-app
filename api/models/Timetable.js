const mongoose = require('mongoose')
const Events = require('./Events')

mongoose.connect('mongodb://localhost:27017/timetable-express-app')
const Timetable = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  events: [Events]
})

module.exports = mongoose.model('Timetable', Timetable)