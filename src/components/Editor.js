import React, { Component } from 'react'
import Event from './Event.js'
import axios from 'axios'
import { connect } from 'react-redux'
import { deleteEvent, fetchUserData } from '../storage/actions'

class Editor extends Component {
  constructor() {
    super()
    this.state = {
      startedAt: 0,
      duration: 0,
      title: ''
    }
  }
  getUserId() { return localStorage.getItem('_id') }
  getToken() { return localStorage.getItem('auth_token')}
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.addEvent()
  }
  addEvent() {
    const eventData = JSON.stringify(this.state)
    axios({
      url: `http://localhost:5000/api/timetable/user/${this.getUserId()}`,
      method: 'POST',
      data: eventData,
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {})
  }
  fetchEvents() {
    axios({
      url: `http://localhost:5000/api/timetable/user/${this.getUserId()}`,
      method: 'GET'
    })
    .then(res => {
      console.log(res, 'response EVENTS')
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Started At:</label>
          <input type="number" id="startedAt" value={this.state.startedAt} onChange={this.handleChange} required/>
          <label>Password:</label>
          <input type="number" id="duration" value={this.state.duration} onChange={this.handleChange} required/>
          <label>Title:</label>
          <input type="text" id="title" value={this.state.title} onChange={this.handleChange} required/>
          <button type="submit">Add</button>
        </form>
        <ul>
          {
            this.props.state.events.map((event, index) => (
              <Event key={index} {...event} onClick={() => {}} />
            ))
          }
        </ul>
      </div>
    )
  }
  componentDidMount() {
    this.props.fetchUserData(this.getToken())
      .then(() => {
        if (this.props.state.user.isAuthorized === false) {
          this.props.history.push('/')
        }
      })
    // this.fetchEvents()
  }
}
const mapStateToProps = state => ({
  state: state
})

export default connect(mapStateToProps, { deleteEvent, fetchUserData })(Editor)