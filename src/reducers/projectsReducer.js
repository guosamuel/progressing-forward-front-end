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
    case "UPDATEPROJECT":
      const unupdatedProject = state.projects.find( project => project.id === action.payload.id )
      return {
        ...state,
        projects: [...state.projects.slice(0, state.projects.indexOf(unupdatedProject)), action.payload, ...state.projects.slice(state.projects.indexOf(unupdatedProject) + 1)]
      }
    default:
      return state
  }
}
