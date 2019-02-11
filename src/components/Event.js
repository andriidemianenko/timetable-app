import React, { Component } from 'react'

const deleteButton = {
  float: 'right',
  color: 'red'
}
const eventStyle = {
  border: '1px solid #000',
  padding: '5px',
  margin: '3px'
}
const eventParams = {
  margin: '3px'
}

class Event extends Component {
  render() {
    return (
      <li>
        <div style={eventStyle}>
          <span style={eventParams}>Strated At: {this.props.startedAt}</span>
          <span style={eventParams}>duration: {this.props.duration}</span>
          <span style={eventParams}>title: {this.props.title}</span>
          <span style={deleteButton} onClick={this.props.delete}>Delete</span>
        </div>
      </li>
    )
  }
}

export default Event