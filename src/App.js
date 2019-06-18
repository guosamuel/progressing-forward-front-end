import React, { Component } from 'react';
import TopHeader from './containers/TopHeader'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from "./containers/Login"
import { connect } from "react-redux"
import ProgressCharts from './containers/ProgressCharts'
import { login } from "./actions/userActions"

class App extends Component {

  // state = {
  //   currentUser: null
  // }

  componentDidMount() {
    const token = localStorage.getItem("token")

    if (token) {
      fetch("http://localhost:3000/api/v1/current_user", {
        headers: {
          Authorization: token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        }
        else {
          this.props.login(data.user)
        }
      })
    }

  }

  render() {
    // console.log("CURRENT USER", this.props.current_user)

    return (
      <div>
        <TopHeader />
        { !!this.props.current_user ? <ProgressCharts /> : <Login /> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("I AM IN THE MAPSTATETOPROPS", state)
  return {
    current_user: state.usersReducer.current_user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
