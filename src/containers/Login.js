import React, { Component } from 'react'

class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log("SUBMITTED")
    fetch('http://localhost:3000/api/v1/auth', {
      method: 'POST',
      headers:{
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(console.log)
  }
  
  render(){
    // console.log(this.state)
    return(
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Username</label><br />
            <input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
          </div>
          <br />
          <div className="field">
            <label>Password</label><br />
            <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
          </div>
          <br />
          <button className="ui button" type="Login">Log In</button>
        </form>
      </div>
    )
  }
}

export default Login
