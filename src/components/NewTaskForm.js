import React, { Component } from 'react'
// import DateForm from './DateForm'
import { DateInput } from 'semantic-ui-calendar-react'
import { connect } from 'react-redux'
import { addTask } from '../actions/taskActions'

class NewTaskForm extends Component {

  state = {
    title: "",
    description: "",
    date: "",
    project_id: this.props.projectId
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
    fetch('http://localhost:3000/api/v1/tasks', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(newTask => {
      if (newTask.error) {
        alert(newTask.error)
      } else {
        this.props.addTask(newTask)
      }
    })
    .then(this.setState({
      title: "",
      description: "",
      date: "",
    }))
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

  render() {
    console.log("I AM IN THE NEW TASK", this.props)
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
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
          />
        </div>
        <br />
        <button className="ui button" type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: (newTask) => dispatch(addTask(newTask))
  }
}

export default connect(null, mapDispatchToProps)(NewTaskForm)
