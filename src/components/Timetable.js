import React, { Component } from 'react';
import axios from 'axios'

export default class Timetable extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Timetable',
      status: ''
    }
  }
  getUserId() { return localStorage.getItem('_id')}
  getToken() { return localStorage.getItem('auth_token') }
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
      this.setState({ status: res.data.status })
      axios({
        url: `http://localhost:5000/api/timetable/user/${this.getUserId()}`,
        method: 'GET'
      })
      .then(res => this.setState({ message: res.data }))
    })
    .catch(err => {
      this.setState({ status: 'Your token is expired!' })
    })
  }
  render() {
    return (
      <div>
        <h1>{this.state.status}</h1>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
  componentDidMount() {
    this.fetchTable()
  }
}