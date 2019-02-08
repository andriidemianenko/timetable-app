const initialState = {
  email: '',
  userId: '',
  isAuthorized: false
}
const userData = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_USER_DATA':
      return Object.assign({}, state.userData, {
        userId: action.payload.userId,
        email: action.payload.email,
        isAuthorized: action.payload.isAuthorized
      })
    default: 
      return state
  }
}

export default userData