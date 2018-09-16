import React from 'react';
import { FieldGroup } from '../common/common';
import { Button } from 'reactstrap';
import { signUp } from '../../api';

class SignUp extends React.Component {
  validateInput = (username, password) => {
    return username.length > 5 && password.length > 7;
  };

  invalidInput = () => {
    window.alert(
      'Username needs to be at least 6 characters.\n' +
        'Password needs to be at least 8 characters.'
    );
  };

  signUp = event => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const username = event.target.elements.formControlsUsername.value;
    const password1 = event.target.elements.formControlsPassword1.value;
    const password2 = event.target.elements.formControlsPassword2.value;
    if (password1 === password2) {
      if (this.validateInput(username, password1)) {
        signUp(username, password1, email)
          .then(() => {
            this.props.close();
            window.alert('User created');
          })
          .catch(
            err =>
              err.response.data.message === 'Username already exists'
                ? window.alert('Username already exist')
                : window.alert('Something went wrong')
          );
      } else {
        this.invalidInput();
      }
    } else {
      window.alert('Passwords does not match');
    }
  };

  render() {
    return (
      <form onSubmit={this.signUp}>
        {FieldGroup({
          id: 'formControlsUsername',
          type: 'username',
          label: 'Brukernavn',
          placeholder: 'Fyll inn brukernavn'
        })}
        {FieldGroup({
          id: 'email',
          label: 'Epost',
          type: 'email',
          placeholder: 'Fyll inn epost'
        })}
        {FieldGroup({
          id: 'formControlsPassword1',
          label: 'Passord',
          type: 'password',
          placeholder: 'Fyll inn passord'
        })}
        {FieldGroup({
          id: 'formControlsPassword2',
          label: 'Gjenta passord',
          type: 'password',
          placeholder: 'Fyll inn passord'
        })}
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default SignUp;
