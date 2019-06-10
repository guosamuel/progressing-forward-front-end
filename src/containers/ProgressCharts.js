import React from 'react'
import ToDoProjectsContainer from './ToDoProjectsContainer.js'
import InProgressProjectsContainer from './InProgressProjectsContainer.js'
import CompletedProjectsContainer from './CompletedProjectsContainer.js'

const ProgressCharts = () => {
  return (
    <div className="ui three column doubling stackable grid container">
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

export default ProgressCharts
