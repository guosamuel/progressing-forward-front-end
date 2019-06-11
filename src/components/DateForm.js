import React, { Component } from 'react'
import { DateInput } from 'semantic-ui-calendar-react';
// import moment from 'moment'

class DateForm extends Component {

  state = {
    date: ""
  }

  handleChange = (event, {name, value}) => {
    event.persist()
    // console.log(event, name, value)
    // debugger
    this.setState({[name]: value})
  }
  // <div className="field exmaple-calendar-input">
  // <div className='ui left icon input'>
  // <i className="calendar icon"></i>
  // <input placeholder="Date" name="date" autocomplete="off" type="text" tabindex="0" value={this.state.date} />
  // </div>
  // </div>

  render() {
    // console.log("I AM IN THE DATE FORM", this.state)
    return (
      <DateInput
        name="date"
        placeholder="Date"
        value={this.state.date}
        iconPosition="left"
        onChange={this.handleChange}
        type="text"
      />
    )
  }
}

export default DateForm
