import React, { Component } from 'react'
import { DateInput } from 'semantic-ui-calendar-react'

class NewProjectForm extends Component {

  render() {
    return (
      <form class="ui form">
        <div class="field">
          <label>Title</label>
          <input type="text" name="title" placeholder="Title" />
        </div>
        <div class="field">
          <label>Description</label>
          <textarea rows="4" cols="50" name="description" placeholder="Enter description here" />
        </div>
        <div class="field>">
          <label>Due Date</label>
          <DateInput
            placeholder="Date"
            name='date'
          />
        </div>
        <br />
        <button class="ui button" type="submit">Submit</button>
      </form>
    )
  }
}

export default NewProjectForm
