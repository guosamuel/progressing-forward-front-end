import React, { Component } from 'react'
import { DateInput } from 'semantic-ui-calendar-react'
import { connect } from 'react-redux'
import { editTask } from '../actions/taskActions'
import { updateProject } from  '../actions/projectActions'

class EditTaskForm extends Component {
  constructor(props) {
    super(props);

    this.reformatDateAppearance = (date) => {
      const year = date.slice(0,4)
      const month = date.slice(5,7)
      const day = date.slice(8,10)
      return `${month}/${day}/${year}`
    }

    this.state = {
      title: this.props.task.title,
      description: this.props.task.description,
      date: this.reformatDateAppearance(this.props.task.due_date),
      task_id: this.props.task.id,
      percentage: this.props.task.percentage
    }

  }

  handleChange = (event) => {
    if (event.target.name === "percentage") {
      this.setState({[event.target.name]: parseInt(event.target.value, 10)})
    }
    else {
      this.setState({[event.target.name]: event.target.value})
    }
  }

  handleDateChange = (event, {name, value}) => {
    // event.persist()
    // console.log("THIS IS THE EVENT", event, "THIS IS THE NAME", name, "THIS IS THE VALUE", value)
    // debugger
    this.setState({[name]: value})
  }

  lastDate = () => {
    // console.log("PROJECT DUE DATE IS", this.props.projectDueDate)
    const lastDate = this.props.projectDueDate
    const year = lastDate.slice(0,4)
    //** NEED THE MINUS 1 BECAUSE JANUARY STARTS AT 00
    const month = lastDate.slice(5,7) - 1
    const day = lastDate.slice(8,10)
    const maxDate = new Date(year, month, day, 23, 59, 59)
    return maxDate
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`https://hidden-retreat-26970.herokuapp.com/api/v1/tasks/${this.state.task_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(editedTask => {
      if (editedTask.error) {
        alert(editedTask.error)
      } else {
        alert(editedTask.success);
        this.props.editTask(editedTask.updated_task);
        this.props.updateProject(editedTask.updated_project)
        this.setState({
          title: editedTask.updated_task.title,
          description: editedTask.updated_task.description,
          date: this.reformatDateAppearance(editedTask.updated_task.due_date),
          percentage: editedTask.updated_task.percentage
        })
      }
    })
    .then(this.props.hideEditTaskForm)
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
          <label>Update Task Total Progress Precentage</label>
            <div className="ui input">
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                onChange={this.handleChange}
                name="percentage"
                value={this.state.percentage}
              />
            </div>
        </div>
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
            maxDate={this.lastDate()}
            closable={true}
          />
        </div>
        <br />
        <button className="ui button" type="submit">Update Task: {this.props.task.title}</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editTask: (updatedTask) => dispatch(editTask(updatedTask)),
    updateProject: (updatedProject) => dispatch(updateProject(updatedProject))
  }
}

export default connect(null, mapDispatchToProps)(EditTaskForm)
