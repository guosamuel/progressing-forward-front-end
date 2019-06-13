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
    case "EDITTASK":
      const uneditedTask = state.tasks.find( task => task.id === action.payload.id )
      return {
        ...state,
        tasks: [...state.tasks.slice(0, state.tasks.indexOf(uneditedTask)), action.payload, ...state.tasks.slice(state.tasks.indexOf(uneditedTask) + 1)]
      }
    default:
      return state
  }
}
