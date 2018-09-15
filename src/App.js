import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Home from './components/Home';
import LogInBox from './components/logIn/LogInBox';

class App extends Component {
  render() {
    return <div>{this.props.loggedIn ? <Home /> : <LogInBox />}</div>;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    loggedIn: state.user.loggedIn
  };
};

export default connect(mapStateToProps)(App);
