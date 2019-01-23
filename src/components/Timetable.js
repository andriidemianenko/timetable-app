import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Editor from './Editor.js'

export default class Timetable extends Component {
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
    if (this.state.isAuthorized) {
      return (
        <h1>Here you can see your table!</h1>
      )
    }
  }
  fetchTable() {
    axios({
      url: 'http://localhost:5000/api/auth',
      method: 'POST',
      data: { token: this.getToken() },
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => {
      this.setState({ status: res.data.status, isAuthorized: true })
      axios({
        url: `http://localhost:5000/api/timetable/user/${this.getUserId()}`,
        method: 'GET'
      })
      .then(res => this.setState({ message: res.data }))
    })
    .catch(err => {
      this.setState({ status: 'Your token is expired!', isAuthorized: false})
      this.props.history.push('/')
    })
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
    this.fetchTable()
  }
}