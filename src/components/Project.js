import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'
import Task from './Task'
import { sanitizeDate } from '../helperFunctions/sanitizeDate'
import { connect } from 'react-redux'
import NewTaskForm from './NewTaskForm'

class Project extends Component {

  state = {
    tasksShown: false,
    taskFormShown: false
  }

  displayTasks = () => {
    this.setState({tasksShown: !this.state.tasksShown})
  }

  displayTaskForm = () => {
    // console.log("I AM IN THE DISPLAY TASK FORM FUNCTION")
    this.setState({taskFormShown: !this.state.taskFormShown})
  }

  render() {
    console.log("IM IN THE PROJECT COMPONENT", this.props)
    const filteredTasks = this.props.allTasks.filter( task => task.project_id === this.props.project.id)
    const renderTasks = filteredTasks.map( task => <Task task={task} key={task.id}/> )

    return (
      <div className="ui middle celled relaxed aligned divided list">
        <div className="item project">
          <div className="right floated content">
            <button className="compact ui icon button" onClick={this.displayTasks}>
              {this.state.tasksShown ? <i className="down chevron icon"></i> : <i className="right chevron icon"></i> }
            </button>
          </div>
          <div className="content project">
            {this.props.project.title}
            <br/>
            Description: {this.props.project.description}
            <br/>
            Point of Contact: {this.props.current_user.first_name} {this.props.current_user.last_name}
            <br />
            Project Due Date: {sanitizeDate(this.props.project.due_date)}
          </div>
          <div>
            <Progress value={this.props.project.percentage} total='100' progress='percent' indicating />
          </div>
            { this.state.tasksShown ?
            <div>
            <button className="compact ui icon button" onClick={this.displayTaskForm}>
              { this.state.taskFormShown ? <i className="down chevron icon"></i> : <i className="right chevron icon"></i> }
            Create New Task
            </button>
            <br/>
            <br/>
            <div>
              {this.state.taskFormShown ? <NewTaskForm projectId={this.props.project.id} projectDueDate={this.props.project.due_date}/> : null}
            </div>
            <div>{ renderTasks }</div>
            </div>
            :null }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    current_user: state.usersReducer.current_user,
    allTasks: state.tasksReducer.tasks
  }
}
export default connect(mapStateToProps)(Project)
