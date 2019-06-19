import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from '../components/Project'

class CompletedProjectsContainer extends Component {

  render() {
    // console.log("I AM IN THE TO DO PROJECTS CONTAINER", this.props)
    const completedProjects = this.props.allProjects.filter( project => project.percentage === 100)
    // console.log("TO DO PROJECTS", toDoProjects)
    const renderCompletedProjects = completedProjects.map( project => <Project project={project} key={project.id}/>)
    return (
      <div>
        <h1 className="top container header">COMPLETED PROJECTS:</h1>
        <div>{renderCompletedProjects}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProjects: state.projectsReducer.projects
  }
}

export default connect(mapStateToProps)(CompletedProjectsContainer)
