import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { submit_new_sheet } from '../ajax';
import store from '../store'
import TasksNew from '../tasks/new';
import {list_jobs} from '../ajax';

function state2props(state) {
  return {form: state.forms.new_sheet, jobs: state.jobs}
}
class SheetsNew extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
      tasks: 0,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_SHEET',
      data: data,
    });
  }
  add_new_task(){
   if (this.state.tasks < 8){
      this.setState({tasks: this.state.tasks + 1});
   } 
  }
  render_tasks(){
    var ret=[];
    var i;
    var jobs = this.props.jobs; 
    for (i = 0; i < this.state.tasks; i++){
      ret.push(<TasksNew key={i} jobs={jobs} index={i+1}/>);
    }
     return (<div> {ret} </div>);
  }

  render() {
    let {date, jobs, id, errors, dispatch} = this.props;
    list_jobs();
    console.log(this.props.id);
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
return (
    <div>
      <h1>New TimeSheet</h1>
      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" 
	  		onChange={(ev) => this.changed({date: ev.target.value}) }/>
      </Form.Group>

      {this.render_tasks()}

      <Form.Group controlId="new_task">
        <Button variant="primary" onClick={() => this.add_new_task()}>+ New Task</Button>
      </Form.Group>

      <Form.Group controlId="submit">
        <Button variant="primary" onClick={() => submit_new_sheet(this)}>Upload Timesheet</Button>
      </Form.Group>
    </div>
  );
}
}
export default connect(state2props)(SheetsNew);
