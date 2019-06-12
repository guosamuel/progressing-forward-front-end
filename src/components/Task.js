import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'
import { sanitizeDate } from '../helperFunctions/sanitizeDate'
import EditTaskForm from './EditTaskForm'

class Task extends Component {
    // console.log("IM IN THE PROJECT COMPONENT", this.props)
    //format date start
  state = {
    editTaskFormShown: false
  }

  displayEditTasks = () => {
    this.setState({editTaskFormShown: !this.state.editTaskFormShown})
  }

  render() {
    return (
      <div className="ui middle celled relaxed aligned divided list">
        <div className="item task">
          <div className="right floated content">
            <button className="compact ui icon button" onClick={this.displayEditTasks}>
              {this.state.editTaskFormShown ? <i className="down chevron icon"></i> : <i className="right chevron icon"></i> }
            </button>
          </div>
          <div className="content task">
            {this.props.task.title}
            <br/>
            Description: {this.props.task.description}
            <br/>
            Task Due Date: {sanitizeDate(this.props.task.due_date)}
          </div>
          <div>
            <Progress value={this.props.task.percentage} total='100' progress='percent' indicating />
          </div>
          <div>
            {this.state.editTaskFormShown ? <EditTaskForm task={this.props.task} projectDueDate={this.props.projectDueDate}/> : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Task
