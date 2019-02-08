import React, { Component } from 'react'
import Event from './Event.js'
import { connect } from 'react-redux'
import { deleteEvent, fetchUserData } from '../storage/actions'

class Editor extends Component {
  getUserId() { return localStorage.getItem('_id') }
  getToken() { return localStorage.getItem('auth_token')}
  render() {
    return (
      <div>
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
    console.log(this.props, 'props')
  }
}
const mapStateToProps = state => ({
  state: state
})

export default connect(mapStateToProps, { deleteEvent, fetchUserData })(Editor)