import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {FieldGroup} from './common/common';
import React from 'react';

const CreateCollective = ({
  hasCollective,
  isLoggedIn,
  setHomeState,
  createCollective
}) => (
  <Modal animation={false} isOpen={!hasCollective}>
    <ModalHeader charCode={"Log out"} toggle={() => isLoggedIn(false)}>
        Create a collective
    </ModalHeader>
    <ModalBody>
      Write in the name of your new collective.
      <form onSubmit={createCollective}>
        {FieldGroup({
          id: "collectiveName",
          type: "collective",
          label: "",
          placeholder: "Name of collective"
        })}
        <div className="split">
          <Button type="submit">Submit</Button>
          <a onClick={() => setHomeState(false)} style={{ cursor: "pointer" }}>
            Or join an existing collective
          </a>
        </div>
      </form>
    </ModalBody>
  </Modal>
);

export default CreateCollective;
