import { combineReducers } from 'redux'
import user from './user.js'
import events from './events.js'

export default combineReducers({
  user,
  events
})