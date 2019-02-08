import React from 'react'

const deleteButton = {
  float: 'right',
  color: 'red'
}
const Event = ({ onClick, startedAt, duration, title }) => (
  <li>
    <div>
      <p>Strated At: {startedAt}</p>
      <p>duration: {duration}</p>
      <p>title: {title}</p>
      <span style={deleteButton}>Delete</span>
    </div>
  </li>
)

export default Event