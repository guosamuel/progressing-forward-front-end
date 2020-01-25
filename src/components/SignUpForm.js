import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../actions/userActions'

class SignUpForm extends Component {

  state = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    successfulSignUp: false,
    failedSignUp: false,
    newUser: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://hidden-retreat-26970.herokuapp.com/api/v1/users', {
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
          failedSignUp: true,
          successfulSignUp: false,
          newUser: {
            firstName: this.state.firstName,
            lastName: this.state.lastName
          }
        })
      }
      else {
        this.props.addUser(data)
        this.setState({
          successfulSignUp: true,
          failedSignUp: false,
          newUser: data,
          username: "",
          password: "",
          firstName: "",
          lastName: ""
        })
      }
    })
  }

  render(){

    return(
      <div className="ui one column centered grid verticallyCenterSignUp">
        { this.state.successfulSignUp ?
          <div className="row">
              <div className="ui success message">
                <div className="header">
                  Thank you for signing up, {this.state.newUser.first_name} {this.state.newUser.last_name}!
                </div>
                <p>You may now log in with the username you have chosen.</p>
              </div>
          </div> : null}
        { this.state.failedSignUp ?
          <div className="row">
              <div className="ui error message">
                <div className="header">
                  There was an error with your submission, {this.state.newUser.firstName} {this.state.newUser.lastName}.
                  <br/ >
                  Below are the potential errors:
                </div>
                <ul className="ui list">
                  <li>You must fill out all input fields in the sign up form.</li>
                  <li>The username you have chosen is already taken.</li>
                </ul>
              </div>
          </div> : null}
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label>Username</label>
              <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={this.state.username}/>
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
            </div>
            <div className="field">
              <label>First Name</label>
              <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} value={this.state.firstName}/>
            </div>
            <div className="field">
              <label>Last Name</label>
              <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} value={this.state.lastName}/>
            </div>
            <button className="ui button" type="Login">Submit New User Form</button>
          </form>
          <div className="row">
            <button className="ui button" onClick={this.props.handleSignUpForm}>Back To Log In Page</button>
          </div>
      </div>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (user) => dispatch(addUser(user))
  }
}

export default connect(null, mapDispatchToProps)(SignUpForm)
