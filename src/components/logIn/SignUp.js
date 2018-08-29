import React from 'react';
import {FieldGroup} from '../common/common';
import {Button} from 'reactstrap';
import {signUp} from '../../api';

class SignUp extends React.Component {
  validateInput = (username, password) => {
    return username.length > 5 && password.length > 7;
  };

  invalidInput = () => {
    window.alert(
      "Username needs to be at least 6 characters.\n" +
      "Password needs to be at least 8 characters."
    );
  };

  signUp = event => {
    event.preventDefault();
    const username = event.target.elements.formControlsUsername.value;
    const password1 = event.target.elements.formControlsPassword1.value;
    const password2 = event.target.elements.formControlsPassword2.value;
    if (password1 === password2) {
      if (this.validateInput(username, password1)){
        signUp(username, password1);
        this.props.close();
        window.alert("User created");
      }

      else{
        this.invalidInput();
      }
    }
    else{
      window.alert("Passwords does not match")
    }
  };

  render() {
    return (
      <form onSubmit={this.signUp}>
        {FieldGroup({
          id: "formControlsUsername",
          type: "username",
          label: "Username",
          placeholder: "Enter username"
        })}
        {FieldGroup({
          id: "formControlsPassword1",
          label: "Password",
          type: "password",
          placeholder: "Enter password"
        })}
        {FieldGroup({
          id: "formControlsPassword2",
          label: "Password",
          type: "password",
          placeholder: "Repeat password"
        })}
        <Button type="submit">Submit</Button>
      </form>
    )
  }
}

export default SignUp