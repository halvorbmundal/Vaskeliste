import {Component} from 'react';
import React from 'react';
import {connect} from 'react-redux';
import {CleaningTask} from '../components';

class CleaningSection extends Component {
  constructor(props) {
    super(props);
  }

  checkTask = id => {
    let checked = this.state.tabell.id.done;
    // flip state
  };

  taskList = tasks => {
    let taskList = tasks.map((task, i) =>
      CleaningTask(i, task.task, this.checkTask())
    );
    return taskList;
  };

  render() {
    return (
      <div>
        <h1>Du er logget inn :)</h1>
        <button onClick={this.logOff}>Log ut</button>
      </div>
    );
  }
}

export default connect(store => {
  return {
    loggedIn: store.loggedIn
  };
})(CleaningSection);
