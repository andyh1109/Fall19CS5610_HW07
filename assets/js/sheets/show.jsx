import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { get_sheet } from '../ajax';

function state2props(state, props) {
  let id = parseInt(props.id);
  return {id: id, sheet: state.sheets.get(id)};
}

function SheetsShow({id, sheet}) {

  if (!sheet) {
    get_sheet(id);

    return (
      <div>
        <h1>Show Photo</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Show Timesheet</h1>
      <p>Date: {sheet.date} </p>
      <p>Status: {sheet.approval}</p>
    </div>
  );
}

export default connect(state2props)(SheetsShow);
