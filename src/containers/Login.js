import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/userActions'

class Login extends Component {

  state = {
    username: "",
    password: "",
    invalid: false
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
    .then(data => {
      if (data.error) {
        this.setState({
          username: "",
          password: "",
          invalid: true
        })
      }
      else {
        const { user, token } = data;
        //this works!
        localStorage.setItem('token', token);
        this.props.login(user)
        this.setState({
          username: "",
          password: "",
          invalid: false
        })
        // console.log(this.props.state)
      }
    })
  }

  render(){
    // console.log("THE PROPS IN LOGIN PAGE ARE", this.props)
    console.log(this.state)
    return(
      <div>
          { this.state.invalid ? <div className="ui red message">Invalid Username or Password</div> : null}
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label>Username</label>
              <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={this.state.username}/>
            </div>
            <br />
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
            </div>
            <br />
            <button className="ui button" type="Login">Log In</button>
          </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch(login(user))
  }
}

// *THIS WAS USED TO CHECK THE CURRENT STATE IF IT WAS PROPERLY LOGGED IN
// const mapStateToProps = state => {
//   return {
//     state: state
//   }
// }

export default connect(null, mapDispatchToProps)(Login)
