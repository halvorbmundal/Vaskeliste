import React from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';
import { bindActionCreators } from 'redux';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { logIn } from '../../api';
import { FieldGroup } from '../common/common';
import SignUp from './SignUp';

class LogInBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
  }
  handleClose = () => {
    this.setState({ modal: false });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  logIn = event => {
    event.preventDefault();
    const username = event.target.elements.formControlsUsername.value;
    const password = event.target.elements.formControlsPassword.value;
    logIn(username, password)
      .then(response => {
        localStorage.setItem('id_token', response.headers.authorization);
        this.props.actions.isLoggedIn(true);
      })
      .catch(() => window.alert('Wrong username or password.'));
  };

  isLoggedIn = () => {
    //isLoggedIn().then(res => console.log(res));
    console.log(this.props.loggedIn);
  };

  render() {
    return (
      <div className="center-center">
        <div className="log-in-box">
          <h1>Login:</h1>
          <form onSubmit={this.logIn}>
            {FieldGroup({
              id: 'formControlsUsername',
              type: 'username',
              label: 'Username',
              placeholder: 'Enter username'
            })}
            {FieldGroup({
              id: 'formControlsPassword',
              label: 'Password',
              type: 'password',
              placeholder: 'Enter password'
            })}
            <div className={'split'}>
              <a onClick={this.toggle} style={{ cursor: 'pointer' }}>
                Create account
              </a>
              <a> </a>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>

        <p>Dette er en nettisde for å for å dele vaskeoppgaver i et kollektiv</p>

        <Modal
          animation={false}
          isOpen={this.state.modal}
          toggle={this.handleClose}
        >
          <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
          <ModalBody>
            <SignUp close={this.handleClose} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.user.loggedIn };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInBox);
