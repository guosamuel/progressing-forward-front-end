export const allProjects = (projects) => {
  return {
    type: "ALLPROJECTS",
    payload: projects
  }
}

export const addProject = (newProject) => {
  return {
    type: "ADDPROJECT",
    payload: newProject
  }
}

export const updateProject = (updatedProject) => {
  return {
    type: "UPDATEPROJECT",
    payload: updatedProject
  }
}
