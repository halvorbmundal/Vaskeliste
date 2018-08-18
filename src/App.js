import React, { Component } from "react";
import { LogInBox, CleaningChecklist } from "./components";
import "./App.css";
import { connect } from "react-redux";

class App extends Component {
  render() {
    let isLoggedIn = this.props.logIn;
    return <div>{isLoggedIn ? <CleaningChecklist /> : <LogInBox />}</div>;
  }
}

export default connect(store => {
  return {
    logIn: store.loggedIn
  };
})(App);
