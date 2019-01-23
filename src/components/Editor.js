import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Link } from 'react-router-dom'

export default class Editor extends Component {
  constructor() {
    super()
    this.state = {
      events: []
    }
  }
  getUserId() { return localStorage.getItem('_id') }
  getToken() { return localStorage.getItem('auth_token')}
  fetchEditor() {
    axios({
      url: 'http://localhost:5000/api/auth',
      method: 'POST',
      data: { token: this.getToken() },
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      this.props.history.push('/')
    })
  }
  render() {
    return (
      <div>
        <ul>
          <li>Event 1</li>
          <li>Event 1</li>
        </ul>
      </div>
    )
  }
  componentDidMount() {
    this.fetchEditor()
  }
}