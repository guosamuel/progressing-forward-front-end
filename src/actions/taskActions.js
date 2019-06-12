export const allTasks = (tasks) => {
  return {
    type: "ALLTASKS",
    payload: tasks
  }
}

export const addTask = (newTask) => {
  return {
    type: "ADDTASK",
    payload: newTask
  }
}
