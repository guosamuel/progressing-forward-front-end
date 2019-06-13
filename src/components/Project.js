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

  // findProjectLead = () => {
  //   return projectLead
  // }

  render() {
    // console.log("IM IN THE PROJECT COMPONENT", this.props)
    const filteredTasks = this.props.allTasks.filter( task => task.project_id === this.props.project.id)
    const renderTasks = filteredTasks.map( task => <Task task={task} key={task.id} projectDueDate={this.props.project.due_date}/> )
    const projectLead = this.props.allUsers.find( user => user.id === this.props.project.project_lead_id)
    const allCollaborators = this.props.project.users.filter( user => user.id !== projectLead.id ).map( collaborator => {
      return (
        <div className="item">
          <i className="right triangle icon"></i>
          <div className="content">
            <div className="header">{collaborator.first_name} {collaborator.last_name}</div>
          </div>
        </div>
      )
    })

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
            Project Lead: {projectLead.first_name} {projectLead.last_name}
            <br />
            Project Due Date: {sanitizeDate(this.props.project.due_date)}
            <br />
            Collaborators:
            <div className="ui list">
              { allCollaborators }
            </div>
          </div>
          <br />
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
    allTasks: state.tasksReducer.tasks,
    allUsers: state.usersReducer.users
  }
}
export default connect(mapStateToProps)(Project)
