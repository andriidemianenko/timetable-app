import React, { Component } from 'react';
import axios from 'axios'
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
    console.log(this.props, 'in component')
    if (this.props.isAuthorized) {
      return (
        <h1>Here you can see your table!</h1>
      )
    }
  }
  redirect() {

  }
  fetchTable() {
    // axios({
    //   url: 'http://localhost:5000/api/auth',
    //   method: 'POST',
    //   data: { token: this.getToken() },
    //   headers: {
    //     'Content-type': 'application/json'
    //   }
    // })
    // .then(res => {
    //   this.setState({ status: res.data.status, isAuthorized: true })
    //   axios({
    //     url: `http://localhost:5000/api/timetable/user/${this.getUserId()}`,
    //     method: 'GET'
    //   })
    //   .then(res => this.setState({ message: res.data }))
    // })
    // .catch(err => {
    //   this.setState({ status: 'Your token is expired!', isAuthorized: false})
    //   this.props.history.push('/')
    // })
  }
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
  }
  componentDidUpdate() {
    console.log(this.props, 'UPDATED PROPS')
    if (this.props.isAuthorized === false) {
      this.props.history.push('/')
    }
  }
}
const mapStateToProps = state => ({
  state: state.user
})
export default connect(mapStateToProps, { fetchUserData })(Timetable)