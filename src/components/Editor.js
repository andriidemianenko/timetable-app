import React, { Component } from 'react'
import Event from './Event.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteEvent, fetchUserData, addEvent, uploadEvents } from '../storage/actions'

class Editor extends Component {
  constructor() {
    super()
    this.state = {
      startedAt: 0,
      duration: 0,
      title: '',
      selectedFile: null
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
  handleSelectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    })
  }
  upload = () => {
    this.props.uploadEvents(this.state.selectedFile, this.getUserId())
  }
  addEvent() {
    const eventData = JSON.stringify(this.state)
    this.props.addEvent(eventData, this.getUserId())
  }
  deleteEvent(id, userId) {
    this.props.deleteEvent(id, userId)
  }
  render() {
    return (
      <div>
        <ul>
          <Link to={`/timetable/user/${this.getUserId()}`}>Timetable</Link>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>Started At:</label>
          <input type="number" id="startedAt" value={this.state.startedAt} onChange={this.handleChange} required/>
          <label>Duration:</label>
          <input type="number" id="duration" value={this.state.duration} onChange={this.handleChange} required/>
          <label>Title:</label>
          <input type="text" id="title" value={this.state.title} onChange={this.handleChange} required/>
          <button type="submit">Add</button>
        </form>
        <div id="fileUpload">
          <input type="file" name="timetable" onChange={this.handleSelectedFile} />
          <button onClick={this.upload}>Upload</button>
        </div>
        <ul style={editorStyle}>
          {
            this.props.state.events.map((event, index) => (
              <Event key={event._id} {...event} delete={() => this.deleteEvent(event._id, event.userId)}/>
            ))
          }
        </ul>
      </div>
    )
  }
  componentDidMount() {
    this.props.fetchUserData(this.getToken())
      .then(() => {
        console.log(this.props.state, 'state editor')
        if (this.props.state.user.isAuthorized === false) {
          this.props.history.push('/')
        }
      })
  }
}
const mapStateToProps = state => ({
  state: state
})

const editorStyle = {
  width: 'auto',
  margin: '20px',
  listStyleType: 'none'
}

export default connect(mapStateToProps, { deleteEvent, fetchUserData, addEvent, uploadEvents })(Editor)