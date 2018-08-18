import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';

import { logOut } from '../actions/logInActions';

class CleaningChecklist extends Component {
  constructor(props) {
    super(props);
  }

  logOff = () => {
    this.props.dispatch(logOut());
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
})(CleaningChecklist);
