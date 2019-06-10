export default (state = {current_user: null}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        current_user: action.payload
      }
    case "LOGOUT":
      return {
        current_user: null
      }
    default:
      return state
  }
}
