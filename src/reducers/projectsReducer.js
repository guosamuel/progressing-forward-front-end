export default (state = {projects: []}, action) => {
  switch (action.type) {
    case "ALLPROJECTS":
      return {
        ...state,
        projects: action.payload
      }
    default:
      return state
  }
}
