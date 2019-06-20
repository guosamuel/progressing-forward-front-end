export default (state = {current_user: null, users: []}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        current_user: action.payload
      }
    case "LOGOUT":
      return {
        ...state,
        current_user: null
      }
    case "ALLUSERS":
      return {
        ...state,
        users: action.payload
      }
    case "ADDUSER":
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    default:
      return state
  }
}
