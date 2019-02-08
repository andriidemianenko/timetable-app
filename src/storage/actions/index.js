import axios from 'axios'

function fetchUser(payload) {
  return {
    type: 'FETCH_USER_DATA',
    payload
  }
}

export const fetchUserData = (token) => dispatch => {
  return axios({
    url: 'http://localhost:5000/api/auth',
    method: 'POST',
    data: { token },
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(res => {
    dispatch(fetchUser(res.data))
    axios({
      url: `http://localhost:5000/api/timetable/user/${res.data.userId}`,
      method: 'GET'
    })
    .then(res => console.log(res, 'res'))
  })
  .catch((err) => {
    dispatch(fetchUser(err.response.data))
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