import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.signup()
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }
  signup() {
    const userData  = JSON.stringify(this.state)
    axios({
      url: 'http://localhost:5000/api/signup', 
      data: userData,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => {
      this.props.history.push('/timetable')
    })
    .catch(err => {
      console.log(`Something went wrong! ${err}`)
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Email:</label>
          <input type="email" id="email" value={this.state.email} onChange={this.handleChange} required/>
          <label>Password:</label>
          <input type="text" id="password" value={this.state.password} onChange={this.handleChange} required/>
          <button type="submit" disabled={!this.validateForm()}>Sign Up</button>
        </form>
      </div>
    );
  }
  componentDidMount() {
    console.log('mounted registration')
  }
}