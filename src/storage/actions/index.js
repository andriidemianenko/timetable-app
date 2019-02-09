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
    .then(res => {
      console.log(res.data.events, 'fetch events')
      dispatch({
        type: 'FETCH_EVENTS',
        payload: res.data.events
      })
    })
  })
  .catch((err) => {
    dispatch(fetchUser(err.response.data))
  })
}

export const addEvent = (event, userId) => dispatch => {
  return axios({
    url: `http://localhost:5000/api/timetable/user/${userId}`,
    method: 'POST',
    data: event,
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(res => {
    console.log(res.data, 'wtf')
    dispatch({
      type: 'ADD_EVENT',
      payload: res.data
    })
  })
  .catch(err => {})
}
export const deleteEvent = (id, userId) => dispatch => {
  console.log(id, 'id')
  return axios({
    url: `http://localhost:5000/api/timetable/user/${userId}`,
    method: 'DELETE',
    data: JSON.stringify({ id }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(res => {
    dispatch({
      type: 'DELETE_EVENT',
      payload: id
    })
  })
  .catch(err => {})
}