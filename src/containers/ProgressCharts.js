import React, { Component } from 'react'
import ToDoProjectsContainer from './ToDoProjectsContainer.js'
import InProgressProjectsContainer from './InProgressProjectsContainer.js'
import CompletedProjectsContainer from './CompletedProjectsContainer.js'
import { connect } from 'react-redux'
import { allProjects } from '../actions/projectActions'

class ProgressCharts extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/projects')
      .then(resp => resp.json())
      .then(projects => this.props.allProjects(projects))
  }

  render() {
    return (
      <div className="ui four column doubling stackable grid container">
        <div className="column" id="ToDoProjectsContainer">
          <ToDoProjectsContainer />
        </div>
        <div className="column" id="InProgressProjectsContainer">
          <InProgressProjectsContainer />
        </div>
        <div className="column" id="CompletedProjectsContainer">
          <CompletedProjectsContainer />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    allProjects: (projects) => dispatch(allProjects(projects))
  }
}
export default connect(null, mapDispatchToProps)(ProgressCharts)
