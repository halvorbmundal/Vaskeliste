import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

export function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input {...props} />
    </FormGroup>
  );
}

export function logOut(loggedIn) {
  localStorage.setItem('id_token', '');
  loggedIn(false);
}
