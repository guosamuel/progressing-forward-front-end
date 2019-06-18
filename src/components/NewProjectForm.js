import React, { Component } from 'react'
// import DateForm from './DateForm'
import { DateInput } from 'semantic-ui-calendar-react'
import { connect } from 'react-redux'
import { addProject } from '../actions/projectActions'

class NewProjectForm extends Component {

  state = {
    title: "",
    description: "",
    date: "",
    user_id: this.props.current_user.id
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleDateChange = (event, {name, value}) => {
    // event.persist()
    // console.log(event, name, value)
    // debugger
    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/projects', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(newProject => {
      if (newProject.error) {
        alert(newProject.error)
      } else {
        this.props.addProject(newProject)
        alert("Your new project was successfully added!")
      }
    })
    .then(this.setState({
      title: "",
      description: "",
      date: "",
    }))
    .then(this.props.hideNewProjectForm)
  }

  render() {
    // console.log("I AM IN THE NEW PROJECT", this.props)
    return (
      <form className="ui form" onSubmit={this.handleSubmit} autoComplete="off">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea
            rows="4"
            cols="50"
            name="description"
            placeholder="Enter description here"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Due Date</label>
          <DateInput
            name="date"
            placeholder="Date"
            value={this.state.date}
            iconPosition="left"
            onChange={this.handleDateChange}
            type="text"
            dateFormat="MM/DD/YYYY"
            minDate={new Date()}
          />
        </div>
        <br />
        <button className="ui button" type="submit">Submit New Project Form</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    current_user: state.usersReducer.current_user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProject: (newProject) => dispatch(addProject(newProject))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectForm)
