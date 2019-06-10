import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/userActions'
// import { NavLink } from 'react-router-dom'

// <NavLink to="/login">Login</NavLink>
class TopHeader extends Component {

  handleLogOut = () => {
    this.props.logout()
    localStorage.removeItem('token')
  }

  render() {
    return(
      <div className="topHeader">
        <h1 className="ui header">Progressing Forward</h1>
        { !!this.props.current_user ?
          <div>
            <h2> Welcome {this.props.current_user.first_name} {this.props.current_user.last_name}
            <button className="ui button" type="Login" onClick={this.handleLogOut}>Log Out</button>
            </h2>
          </div>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    current_user: state.current_user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)
