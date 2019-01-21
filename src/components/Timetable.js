import React, { Component } from 'react';
import axios from 'axios'

export default class Timetable extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Timetable'
    }
  }
  fetchTable() {
    axios.get('http://localhost:5000/api/timetable')
      .then(res => {
          console.log(res)
          this.setState({ message: res.data })
        }
      )
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
  componentDidMount() {
    this.fetchTable()
    console.log('mounted timetable')
  }
}