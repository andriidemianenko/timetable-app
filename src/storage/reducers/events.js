const events = (state = [], action) => {
  switch(action.type) {
    case 'SET_EVENTS':
      return Object.assign({}, state, {
        events: action.events
      })
    case 'ADD_EVENT':
      return Object.assign({}, state, {
        events: [
          ...state.events,
          {
            startedAt: action.startedAt,
            duration: action.duration,
            title: action.title
          }
        ]
      })
    case 'DELETE_EVENT':
      return state.filter((event, index, events) => events[index] !== action.index)
    default: 
      return state
  }
}

export default events