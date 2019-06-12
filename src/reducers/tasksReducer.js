export default (state = {tasks: []}, action) => {
  switch (action.type) {
    case "ALLTASKS":
      return {
        ...state,
        tasks: action.payload
      };
    case "ADDTASK":
      return {
        tasks: [action.payload, ...state.tasks]
      }
    default:
      return state
  }
}
