const userData = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USER_ID':
      return Object.assign({}, state, {
        userId: action.id
      })
    case 'SET_USER_EMAIL': 
      return Object.assign({}, state, {
        email: action.email
      })
    default: 
      return state
  }
}

export default userData