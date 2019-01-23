import axios from 'axios'

export const fetchUserData = (token) => dispatch => {
  axios({
    url: 'http://localhost:5000/api/auth',
    method: 'POST',
    data: { token },
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(res => {
    dispatch({
      type: 'FETCH_USER_DATA',
      payload: res.data
    })
    console.log('fetched!')
    axios({
      url: `http://localhost:5000/api/timetable/user/${res.data.userId}`,
      method: 'GET'
    })
    .then(res => console.log(res))
  })
}
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