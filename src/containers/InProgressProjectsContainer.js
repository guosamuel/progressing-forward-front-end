import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from '../components/Project'

class InProgressProjectsContainer extends Component {

  render() {
    // console.log("I AM IN THE TO DO PROJECTS CONTAINER", this.props)
    const inProgressProjects = this.props.allProjects.filter( project => project.percentage > 0 && project.percentage < 100)
    // console.log("TO DO PROJECTS", toDoProjects)
    const renderInProgressProjects = inProgressProjects.map( project => <Project project={project} key={project.id}/>)
    return (
      <div>
        <h1 className="top container header">IN PROGRESS PROJECTS:</h1>
        <div>{renderInProgressProjects}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProjects: state.projectsReducer.projects
  }
}

export default connect(mapStateToProps)(InProgressProjectsContainer)
