import React, { Component } from 'react'
import axios from 'axios'
import Event from './Event.js'

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
          {
            
          }
        </ul>
      </div>
    )
  }
  componentDidMount() {
    this.fetchEditor()
  }
}