import React, { Component } from 'react';
import TopHeader from './containers/TopHeader'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from "./containers/Login"
import { connect } from "react-redux"
import ProgressCharts from './containers/ProgressCharts'

class App extends Component {
  render() {
    console.log("CURRENT USER", this.props.current_user)
    return (
      <div>
        <TopHeader />
        { !!this.props.current_user ? <ProgressCharts /> : <Login /> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("I AM IN THE MAPSTATETOPROPS", state)
  return {
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(App);
