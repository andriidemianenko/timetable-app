import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserData } from '../storage/actions/index'

const timetableContainer = {
  width: '1500px',
  height: '1440px',
  backgroundColor: 'grey',
  padding: '20px',
  position: 'absolute'
}
const eventTitle = {
  verticalAlign: 'text-top',
  display: 'table-cell'
}
const eventPosition = (startedAt, duration) => {
  return {
    display: 'table',
    top: `${startedAt}px`,
    height: `${duration}px`,
    width: '300px',
    borderTop: '2px solid green',
    backgroundColor: 'white',
    position: 'absolute'
  }
}
class Timetable extends Component {
  getUserId() { return localStorage.getItem('_id')}
  getToken() { return localStorage.getItem('auth_token') }
  render() {
    return (
      <div>
        <ul>
          <Link to={`/editor/user/${this.getUserId()}`}>Editor</Link>
        </ul>
        <div style={timetableContainer}>
          {
            this.props.state.events.map(event => (
              <div key={event._id} style={eventPosition(event.startedAt, event.duration)}>
                <h5 style={eventTitle}>{event.title}</h5>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchUserData(this.getToken())
      .then(() => {
        console.log(this.props, 'state')
        if (this.props.state.user.isAuthorized === false) {
          this.props.history.push('/')
        }
      })
  }
}
const mapStateToProps = state => ({
  state
})
export default connect(mapStateToProps, { fetchUserData })(Timetable)