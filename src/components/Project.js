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

    //** ONLY THE PROJECT LEAD HAS THE RELATIONAL ATTRIBUTES ASSOCIATED WITH IT. THE COLLABORATORS DO NOT HAVE THE RELATIONAL ATTRIBUTES
    const projectLead = this.props.allUsers.find( user => user.id === this.props.project.project_lead_id)
    // debugger
    // console.log("CURRENT COLLABORATORS AND PROJECT LEAD", currentCollaboratorsAndProjectLead)
    // map( user => ({value: user.id, name: `${user.first_name} ${user.last_name}`}))
    const potentialCollaborators = []
    const collaborators = this.props.project.users && projectLead ? this.props.project.users.filter( user => user.id !== projectLead.id ) : []

    const currentCollaboratorsAndProjectLead = [...collaborators, projectLead]

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
  //
  //   this.setState({
  //     collaborators: collaborators,
  //     projectLead: projectLead,
  //     potentialCollaborators: potentialCollaborators
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

  handleAddingSelectedCollaborators = () => {
    console.log("THESE ARE THE SELECTED vera", this.state.selectedCollaborators)
    fetch(`http://localhost:3000/api/v1/user_projects`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        selectedCollaborators: this.state.selectedCollaborators,
        projectId: this.props.project.id
      })
    })
    .then(resp => resp.json())
    .then(data => {
      alert(data.success)

      const updatedPotentialCollaborators = []

      this.state.potentialCollaborators.forEach(potentialCollaborator => {
        const toBeAdded = data.added_collaborators.find( added_collaborator => added_collaborator.id === potentialCollaborator.id)
        if (!toBeAdded) {
          updatedPotentialCollaborators.push(potentialCollaborator)
        }
      })

      this.setState({
        selectedCollaborators: [],
        collaborators: [...this.state.collaborators, ...data.added_collaborators],
        potentialCollaborators: updatedPotentialCollaborators
      }, () => console.log(this.state))
    })
  }

  render() {
    console.log(this.props.project.title, "COLLABORATORS ARE", this.state.collaborators)
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

    const collaboratorOptions = this.state.potentialCollaborators.map( collaborator => ({value: collaborator.id, name: `${collaborator.first_name} ${collaborator.last_name}`}))

    const selectedCollaborators = this.state.selectedCollaborators

    // console.log("CURRENT COLLABORATORS", this.state.collaborators)

    return (
      <div className="ui middle celled relaxed aligned divided list">
        <div className="item project">

          <div className="right floated content">

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
            Collaborator(s):
            <br />
            <br />
            <div className="ui list">

              { this.state.collaborators.length === 0 ?
                <div className="item">
                  <i className="right triangle icon"></i>
                  <div className="content">
                    <div className="header">You currently do not have any collaborators on this project.</div>
                  </div>
                </div>
                : renderCollaborators }
            </div>
            <br />
            { this.state.projectLead && this.props.current_user.id === this.state.projectLead.id ?
            <div>
              <button className="compact ui icon button" onClick={this.displayMoreCollaborators}>
                {this.state.moreCollaboratorsShown ?
                  <i className="down chevron icon"></i> :
                  <i className="right chevron icon"></i>
                }
              Add Collaborator(s)
              </button>
            </div> : null
            }
            { this.state.moreCollaboratorsShown ? <div className="ui grid">
              <div className="eight wide column">
                <FilteredMultiSelect
                  onChange={this.handleSelectionChangeCollaborator}
                  options={collaboratorOptions}
                  selectedOptions={selectedCollaborators}
                  textProp="name"
                  valueProp="value"
                  placeholder="Filter by name"
                  size="5"
                />
              </div>
              <br />
              <div className="ui grid">
                <div className="sixteen wide fluid column">
                  {selectedCollaborators.length === 0 && <p>You have yet add an additional collaborator.</p>}
                  {selectedCollaborators.length > 0 &&
                  <ul>
                    {selectedCollaborators.map( (option, idx) => <li key={option.value}>
                      {`${option.name}`}
                    <button type="button" onClick={ () => this.handleDeselectCollaborator(idx)}>
                    &times;
                    </button>
                    </li>)}
                    <br />
                    <br />
                    <button type="ui left floated button" onClick={this.handleAddingSelectedCollaborators}>
                      Add Selected Collaborator(s)
                    </button>
                  </ul>
                  }
                </div>
              </div>
            </div>
            : null
            }
          </div>
          <br />
          <br />
          <div>
            <Progress value={this.props.project.percentage} total='100' progress='percent' indicating />
          </div>
          {this.state.tasksShown ?
            <button className="compact ui icon button" onClick={this.displayTasks}>
              <i className="down chevron icon"></i>
               Hide Project Task(s)
            </button> :
            <button className="compact ui icon button" onClick={this.displayTasks}>
              <i className="right chevron icon"></i>
              Show Project Task(s)
            </button> }
            <br />
            <br />
              { this.state.tasksShown ?
              <div>
                { this.state.projectLead && this.props.current_user.id === this.state.projectLead.id ?
                <div>
                  <button className="compact ui icon button" onClick={this.displayTaskForm}>
                    { this.state.taskFormShown ? <i className="down chevron icon"></i> : <i className="right chevron icon"></i> }
                  Create New Task
                  </button>
                </div>
                :
                null  }
                <br />
                <div>
                  {this.state.taskFormShown ? <NewTaskForm projectId={this.props.project.id} projectDueDate={this.props.project.due_date}/> : null}
                </div>
                <div>
                  { renderTasks }
                </div>
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
