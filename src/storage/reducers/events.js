const events = (state = [], action) => {
  switch(action.type) {
    case 'FETCH_EVENTS':
      return action.payload
    case 'ADD_EVENT':
      return [
        ...state,
        action.payload
      ]
    case 'DELETE_EVENT':
      return state.filter(event => event._id !== action.payload)
    default: 
      return state
  }
}

export default events