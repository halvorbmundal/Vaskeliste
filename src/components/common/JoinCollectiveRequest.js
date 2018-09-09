import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import React from 'react';
import {acceptRequest} from '../../api';

const JoinCollectiveRequest = ({ hasRequests, user, removeRequest }) => (
  <Modal isOpen={hasRequests}>
    <ModalHeader>{user.username} wants to join your collective!</ModalHeader>
    <ModalBody>
      Do you want to accept the user {user.username} to your collective?
      <Button
        onClick={() => {
          acceptRequest(user.id);
          removeRequest();
        }}
      >
        Accept
      </Button>
      <Button
        onClick={() => {
          removeRequest(user.id);
          removeRequest();
        }}
      >
        Deny
      </Button>
    </ModalBody>
  </Modal>
);

export default JoinCollectiveRequest;
