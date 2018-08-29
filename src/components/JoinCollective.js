import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {FieldGroup} from './common/common';
import React from 'react';

const JoinCollective = ({
  hasCollective,
  isLoggedIn,
  setHomeState,
  joinCollective
}) => (
  <Modal animation={false} isOpen={!hasCollective}>
    <ModalHeader charCode={"Log out"} toggle={() => isLoggedIn(false)}>
        Join a collective
    </ModalHeader>
    <ModalBody>
      Write in the name of the collective you want to join. The administrator of
      that collective will have to accept your request.
      <form onSubmit={joinCollective}>
        {FieldGroup({
          id: "collectiveName",
          type: "collective",
          label: "",
          placeholder: "Name of collective"
        })}
        <div className="split">
          <Button type="submit">Submit</Button>
          <a onClick={() => setHomeState(true)} style={{ cursor: "pointer" }}>
            Or create a new collective
          </a>
        </div>
      </form>
    </ModalBody>
  </Modal>
);

export default JoinCollective;
