import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'
import Task from './Task'
import { sanitizeDate } from '../helperFunctions/sanitizeDate'

class Project extends Component {

  state = {
    tasksShown: false
  }

  handleClick = () => {
    this.setState({tasksShown: !this.state.tasksShown})
  }

  render() {
    // console.log("IM IN THE PROJECT COMPONENT", this.props)
    const renderTasks = this.props.project.tasks.map( task => <Task task={task} /> )

    return (
      <div className="ui middle celled relaxed aligned divided list">
        <div className="item project">
          <div className="right floated content">
            <button className="compact ui icon button" onClick={this.handleClick}>
              {this.state.tasksShown ? <i className="down chevron icon"></i> : <i className="right chevron icon"></i> }
            </button>
          </div>
          <div className="content project">
            {this.props.project.title}
            <br/>
            Description: {this.props.project.description}
            <br/>
            Point of Contact: {this.props.project.users[0].first_name} {this.props.project.users[0].last_name}
            <br />
            Project Due Date: {sanitizeDate(this.props.project.due_date)}
          </div>
          <div>
            <Progress value={this.props.project.percentage} total='100' progress='percent' indicating />
          </div>
          <div>
            { this.state.tasksShown ? renderTasks : null }
          </div>
        </div>
      </div>
    )
  }
}

export default Project
