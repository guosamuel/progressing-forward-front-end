import React, { Component } from 'react'
import { DateInput } from 'semantic-ui-calendar-react'
import { connect } from 'react-redux'
import { updateProject } from  '../actions/projectActions'

class EditProjectForm extends Component {
  constructor(props) {
    super(props);

    this.reformatDateAppearance = (date) => {
      const year = date.slice(0,4)
      const month = date.slice(5,7)
      const day = date.slice(8,10)
      return `${month}/${day}/${year}`
    }

    this.state = {
      title: this.props.project.title,
      description: this.props.project.description,
      date: this.reformatDateAppearance(this.props.project.due_date),
      project_id: this.props.project.id,
    }

  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleDateChange = (event, {name, value}) => {
    // event.persist()
    // console.log("THIS IS THE EVENT", event, "THIS IS THE NAME", name, "THIS IS THE VALUE", value)
    // debugger
    this.setState({[name]: value})
  }

  // lastDate = () => {
  //   // console.log("PROJECT DUE DATE IS", this.props.projectDueDate)
  //   const lastDate = this.props.projectDueDate
  //   const year = lastDate.slice(0,4)
  //   //** NEED THE MINUS 1 BECAUSE JANUARY STARTS AT 00
  //   const month = lastDate.slice(5,7) - 1
  //   const day = lastDate.slice(8,10)
  //   const maxDate = new Date(year, month, day, 23, 59, 59)
  //   return maxDate
  // }

  handleSubmit = (event) => {
    event.preventDefault()
    // console.log("I AM IN THE EDIT PROJECT FORM")
    fetch(`https://hidden-retreat-26970.herokuapp.com/api/v1/projects/${this.state.project_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(editedProject => {
      if (editedProject.error) {
        alert(editedProject.error)
      } else {
        alert(editedProject.success);
        this.props.updateProject(editedProject.updated_project)
        this.setState({
          title: editedProject.updated_project.title,
          description: editedProject.updated_project.description,
          date: this.reformatDateAppearance(editedProject.updated_project.due_date),
        })
      }
    })
    .then(this.props.hideEditProjectForm)
  }

  reformatDateAppearance = (date) => {
    const year = date.slice(0,4)
    const month = date.slice(5,7)
    const day = date.slice(8,10)
    return `${month}/${day}/${year}`
  }

  render() {
    // console.log("I AM IN THE EDIT TASK FORM", this.state)
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
            closable={true}
          />
        </div>
        <br />
        <button className="ui button" type="submit">Update Project: {this.props.project.title}</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProject: (updatedProject) => dispatch(updateProject(updatedProject))
  }
}

export default connect(null, mapDispatchToProps)(EditProjectForm)
