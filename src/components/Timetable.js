import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserData } from '../storage/actions/index'

const timetableContainer = {
  width: '1500px',
  height: '1440px',
  backgroundColor: 'grey',
  padding: '20px',
  position: 'absolute'
}
const eventTitle = {
  verticalAlign: 'text-top',
  display: 'table-cell'
}
const column = {

}
const eventPosition = (startedAt, duration, column, intersections) => {
  const eventWidth = 600/intersections
  let leftPosition = 10
  if (column > 1) {
    leftPosition = eventWidth * (column - 1)
  }
  return {
    display: 'block',
    top: `${startedAt}px`,
    height: `${duration}px`,
    left: leftPosition,
    width: `${eventWidth}px`,
    borderTop: '2px solid green',
    border: '1px solid red',
    backgroundColor: 'white',
    position: 'absolute',
    overflow: 'hidden'
  }
}
class Timetable extends Component {
  constructor() {
    super();
    this.state = {
      groups: []
    }
  }
  getUserId() { return localStorage.getItem('_id')}
  getToken() { return localStorage.getItem('auth_token') }
  sortedEvents() {
    this.props.state.events.forEach(event => {
      event.column = 0
    })
    return this.props.state.events.sort((event1, event2) => event1.startedAt - event2.startedAt)
  }
  groupEvents() {
    let groups = []
    let currentGroupStart = 0
    let currentMaxFinish = 0
    const events = this.sortedEvents()
    console.log(events, 'sorted events')
    events.forEach((interval, index) => {
      interval.finish = interval.startedAt + interval.duration
      currentMaxFinish = Math.max(interval.finish, currentMaxFinish)
      if(!events[index + 1] || currentMaxFinish < events[index + 1].startedAt) {
        groups.push({
          intersections: 0,
          intervals: events.slice(currentGroupStart, index + 1)
        })
        currentGroupStart = index + 1
        currentMaxFinish = 0
      }
    })
    this.setColumns(groups)
    console.log(this.state.groups, 'group method')
  }
  setColumns(groups) {
    groups.forEach(group => {
      for(let i = 0; i < group.intervals.length; i++) {
        for(let j = group.intervals.length - 1; j >= 0 ; j--) {
          if((group.intervals[i].startedAt <= group.intervals[j].startedAt) && (group.intervals[i].finish >= group.intervals[j].startedAt)) {
            group.intervals[j].column += 1
            group.intersections = group.intervals[j].column
          }
        }
      }
    })
    this.setState({ groups })
  }
  
  render() {
    return (
      <div>
        <ul>
          <Link to={`/editor/user/${this.getUserId()}`}>Editor</Link>
        </ul>
        <div style={timetableContainer}>
          {
            this.state.groups.map((group, index) => {
                return (
                  <div key={index}>
                  {
                    group.intervals.map(interval => (
                      <div key={interval._id} style={eventPosition(interval.startedAt, interval.duration, interval.column, group.intersections)}>
                        <h5 style={eventTitle}>{interval.title}</h5>
                      </div>
                    ))
                  }
                  </div>
                )
              }
            )
          }
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchUserData(this.getToken())
      .then(() => {
        this.groupEvents()
        console.log(this.state.groups, 'did mount')
        if (this.props.state.user.isAuthorized === false) {
          this.props.history.push('/')
        }
      })
  }
}
const mapStateToProps = state => ({
  state
})
export default connect(mapStateToProps, { fetchUserData })(Timetable)