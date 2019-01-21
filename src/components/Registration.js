import React, { Component } from 'react';

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
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }
  login() {
    let userData = JSON.stringify(this.state)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Email:</label>
          <input type="email" id="email" value={this.state.email} onChange={this.handleChange} required/>
          <label>Password:</label>
          <input type="text" id="password" value={this.state.password} onChange={this.handleChange} required/>
          <button type="submit" disabled={!this.validateForm()}>Login</button>
        </form>
      </div>
    );
  }
  componentDidMount() {
    console.log('mounted registration')
  }
}