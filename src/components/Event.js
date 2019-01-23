import React from 'react'

const Event = ({ onClick, startedAt, duration, title }) => (
  <li>
    <p>Strated At: {startedAt}</p>
    <p>duration: {duration}</p>
    <p>title: {title}</p>
  </li>
)

export default Event