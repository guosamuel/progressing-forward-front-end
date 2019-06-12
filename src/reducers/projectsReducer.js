export default (state = {projects: []}, action) => {
  switch (action.type) {
    case "ALLPROJECTS":
      return {
        ...state,
        projects: action.payload
      };
    case "ADDPROJECT":
      return {
        projects: [action.payload, ...state.projects]
      }
    default:
      return state
  }
}
