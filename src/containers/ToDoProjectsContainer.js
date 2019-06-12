import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from '../components/Project'
import NewProjectForm from '../components/NewProjectForm'

class ToDoProjectsContainer extends Component {

  state = {
    projectFormShown: false
  }

  handleClick = () => {
    this.setState({projectFormShown: !this.state.projectFormShown})
  }

  render() {
    // console.log("I AM IN THE TO DO PROJECTS CONTAINER", this.props)
    // debugger
    const toDoProjects = this.props.allProjects.filter( project => project.percentage === 0)
    // console.log("TO DO PROJECTS", toDoProjects)
    const renderToDoProjects = toDoProjects.map( project => <Project project={project} key={project.id}/>)
    return (
      <div>
        <h1>TO DO:</h1>
        <button className="compact ui icon button" onClick={this.handleClick}>
          {this.state.projectFormShown ? <i className="down chevron icon"></i> : <i className="right chevron icon"></i> }
          Create New Project
        </button>
        <br/>
        <br/>
        <div> {this.state.projectFormShown ? <NewProjectForm /> : null} </div>
        <br />
        <div>{renderToDoProjects}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProjects: state.projectsReducer.projects
  }
}

export default connect(mapStateToProps)(ToDoProjectsContainer)
