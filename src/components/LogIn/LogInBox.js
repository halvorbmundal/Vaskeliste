import React, { Component } from "react";
import { connect } from "react-redux";
import * as logInActions from "../../actions/logInActions";
import { bindActionCreators } from "redux";
import { Button, Modal } from "react-bootstrap";
import { logIn } from "../../api";
import { FieldGroup } from "./common";
import SignUp from "./SignUp";

class LogInBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  logIn = event => {
    event.preventDefault();
    const username = event.target.elements.formControlsUsername.value;
    const password = event.target.elements.formControlsPassword.value;
    logIn(username, password).then(json => json.ok ? this.props.actions.logIn() : window.alert("Wrong username or password"));
  };

  render() {
    return (
      <div className="center-center">
        <div className="logInBox">
          <h1>Login:</h1>
          <form onSubmit={this.logIn}>
            {FieldGroup({
              id: "formControlsUsername",
              type: "username",
              label: "Username",
              placeholder: "Enter username"
            })}
            {FieldGroup({
              id: "formControlsPassword",
              label: "Password",
              type: "password",
              placeholder: "Enter password"
            })}
            <a  onClick={this.handleShow} style={{cursor: 'pointer'}}>
              Create account
            </a><a> </a>
            <Button type="submit">Submit</Button>
          </form>
        </div>

        <Modal animation={false} show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignUp/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(logInActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInBox);
