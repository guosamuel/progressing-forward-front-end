export const login = (user) => {
  return {
    type: "LOGIN",
    payload: user
  }
}

export const logout = () => {
  return {
    type: "LOGOUT"
  }
}

export const allUsers = (users) => {
  return {
    type: "ALLUSERS",
    payload: users
  }
}

export const addUser = (user) => {
  return {
    type: "ADDUSER",
    payload: user
  }
}
