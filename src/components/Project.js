import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'
import Task from './Task'
import { sanitizeDate } from '../helperFunctions/sanitizeDate'
import { connect } from 'react-redux'
import NewTaskForm from './NewTaskForm'
import FilteredMultiSelect from 'react-filtered-multiselect'

class Project extends Component {
  constructor(props) {
    super(props)

    const projectLead = this.props.allUsers.find( user => user.id === this.props.project.project_lead_id)
    const collaborators = this.props.project.users.filter( user => user.id !== projectLead.id )
    // debugger
    const currentCollaboratorsAndProjectLead = [...collaborators, projectLead]
    console.log("CURRENT COLLABORATORS AND PROJECT LEAD", currentCollaboratorsAndProjectLead)
    // map( user => ({value: user.id, name: `${user.first_name} ${user.last_name}`}))
    const potentialCollaborators = []

    this.props.allUsers.forEach ( potentialCollaborator => {

      const collaboratorExist = currentCollaboratorsAndProjectLead.find( collaborator => {
          // debugger
          return collaborator.id === potentialCollaborator.id })

      const collaboratorAlreadyIncluded = potentialCollaborators.find( collaborator => {
        return collaborator.id === potentialCollaborator.id
      })

      if (!collaboratorExist && !collaboratorAlreadyIncluded) {
        potentialCollaborators.push(potentialCollaborator)
      }
    })

    this.state = {
      tasksShown: false,
      taskFormShown: false,
      moreCollaboratorsShown: false,
      collaborators: collaborators,
      projectLead: projectLead,
      selectedCollaborators: [],
      potentialCollaborators: potentialCollaborators
    }

  }

  // componentDidMount() {
  //   debugger
  //   this.setState({
  //     projectLead: projectLead,
  //     collaborators: [...collaborators]
  //   })
  // }

  displayTasks = () => {
    this.setState({tasksShown: !this.state.tasksShown})
  }

  displayTaskForm = () => {
    // console.log("I AM IN THE DISPLAY TASK FORM FUNCTION")
    this.setState({taskFormShown: !this.state.taskFormShown})
  }

  displayMoreCollaborators = () => {
    this.setState({moreCollaboratorsShown: !this.state.moreCollaboratorsShown})
  }

  // findProjectLead = () => {
  //   return projectLead
  // }

  handleDeselectCollaborator = (index) => {
    //makes a copy of the state
    const selectedCollaborators = this.state.selectedCollaborators.slice()
    //returns the options that were spliced
    selectedCollaborators.splice(index, 1)
    this.setState({selectedCollaborators: selectedCollaborators})
  }

  handleSelectionChangeCollaborator = (selectedCollaborators) => {
    this.setState({selectedCollaborators: selectedCollaborators})
  }

  render() {
    // console.log("IM IN THE PROJECT COMPONENT", this.props)
    const filteredTasks = this.props.allTasks.filter( task => task.project_id === this.props.project.id)
    const renderTasks = filteredTasks.map( task => <Task task={task} key={task.id} projectDueDate={this.props.project.due_date}/> )
    // const projectLead = this.props.allUsers.find( user => user.id === this.props.project.project_lead_id)
    // const allCollaborators = this.props.project.users.filter( user => user.id !== projectLead.id )
    const renderCollaborators = this.state.collaborators.map( collaborator => {
      return (
        <div className="item">
          <i className="right triangle icon"></i>
          <div className="content">
            <div className="header">{collaborator.first_name} {collaborator.last_name}</div>
          </div>
        </div>
      )
    })



    console.log(this.props.project.title, this.state.potentialCollaborators)

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
            Project Lead: { this.state.projectLead ? `${this.state.projectLead.first_name} ${this.state.projectLead.last_name}` : "TBD" }
            <br />
            Project Due Date: {sanitizeDate(this.props.project.due_date)}
            <br />
            <br />
            Collaborators:
            <br />
            <br />
            <div>
              <button className="compact ui icon button" onClick={this.displayMoreCollaborators}>
                { this.state.moreCollaboratorsShown ? <i className="down chevron icon"></i> : <i className="right chevron icon"></i> }
              Add Collaborator(s)
              </button>
            </div>
            <div>

            </div>
            <div className="ui list">
              { renderCollaborators }
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
