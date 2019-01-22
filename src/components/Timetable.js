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
  fetchTable() {
    axios.get('http://localhost:5000/api/timetable')
      .then(res => {
          this.setState({ message: res.data })
        }
      )
    axios({
      url: 'http://localhost:5000/api/auth',
      method: 'POST',
      data: { token: localStorage.getItem('auth_token') },
      headers: {
        'Content-type': 'application/json'
      },
      params: {
        userId: localStorage.getItem('_id')
      }
    })
    .then(res => {
      this.setState({ status: res.data.status })
    })
    .catch(err => {
      this.setState({ status: 'Your token is expired!' })
    })
  }
  render() {
    return (
      <div>
        <h1>{this.state.status}</h1>
      </div>
    );
  }
  componentDidMount() {
    this.fetchTable()
  }
}