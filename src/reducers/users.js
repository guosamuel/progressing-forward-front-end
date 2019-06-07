export default (state = {current_user: null}, action) => {
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
    default:
      return state
  }
}
