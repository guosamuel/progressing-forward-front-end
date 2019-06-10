import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from '../components/Project'

class ToDoProjectsContainer extends Component {

  render() {
    // console.log("I AM IN THE TO DO PROJECTS CONTAINER", this.props)
    const toDoProjects = this.props.allProjects.filter( project => project.percentage === 0)
    // console.log("TO DO PROJECTS", toDoProjects)
    const renderToDoProjects = toDoProjects.map( project => <Project project={project} key={project.id}/>)
    return (
      <div>
        <h1>TO DO:</h1>
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
