import React from 'react'
import { Progress } from 'semantic-ui-react'
import { sanitizeDate } from '../helperFunctions/sanitizeDate'

const Task = (props) => {
    // console.log("IM IN THE PROJECT COMPONENT", props)
    //format date start

  return (
    <div className="ui middle celled relaxed aligned divided list">
      <div className="item task">
        <div className="right floated content">

        </div>
        <div className="content task">
          {props.task.title}
          <br/>
          Description: {props.task.description}
          <br/>
          Task Due Date: {sanitizeDate(props.task.due_date)}
        </div>
        <div>
          <Progress value={props.task.percentage} total='100' progress='percent' indicating />
        </div>
      </div>
    </div>
  )
}

export default Task
