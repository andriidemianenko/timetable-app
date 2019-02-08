const events = (state = [], action) => {
  switch(action.type) {
    case 'FETCH_EVENTS':
      return action.payload
    case 'ADD_EVENT':
      return Object.assign({}, state, {
        events: [
          ...state.events,
          {
            startedAt: action.payload.startedAt,
            duration: action.payload.duration,
            title: action.payload.title
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