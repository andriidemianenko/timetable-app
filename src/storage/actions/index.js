export const setUserId = id => ({
  type: 'SET_USER_ID',
  id
})

export const setUserEmail = email => ({
  type: 'SET_USER_EMAIL',
  email
})

export const setEvents = events => ({
  type: 'SET_EVENTS',
  events
})

export const addEvent = event => ({
  type: 'ADD_EVENT',
  startedAt: event.startedAt,
  duration: event.duration,
  title: event.title
})

export const deleteEvent = index => ({
  type: 'DELETE_EVENT',
  index
})