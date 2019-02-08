import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserData } from '../storage/actions/index'

class Timetable extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Timetable',
      status: '',
      isAuthorized: false
    }
  }
  getUserId() { return localStorage.getItem('_id')}
  getToken() { return localStorage.getItem('auth_token') }
  checkAuthorization() {
    if (this.props.state.isAuthorized) {
      return (
        <h1>Here you can see your table!</h1>
      )
    }
  }
  fetchTable() {}
  render() {
    return (
      <div>
        {
          this.checkAuthorization()
        }
        <ul>
          <Link to={`/editor/user/${this.getUserId()}`}>Editor</Link>
        </ul>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchUserData(this.getToken())
      .then(() => {
        if (this.props.state.isAuthorized === false) {
          this.props.history.push('/')
        }
      })
  }
}
const mapStateToProps = state => ({
  state: state.user
})
export default connect(mapStateToProps, { fetchUserData })(Timetable)