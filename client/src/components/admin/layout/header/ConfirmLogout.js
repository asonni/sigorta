import React, { Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default props => (
  <Fragment>
    <Button
      type="button"
      color="danger"
      onClick={props.toggle}
      style={{ marginRight: '10px', marginLeft: '10px' }}
    >
      <i className="fa fa-lock fa-lg" />
    </Button>
    <Modal isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Logout Warning!</ModalHeader>
      <ModalBody className="text-center">
        <h5>Are you sure you want to logout?</h5>
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="danger" onClick={props.onAccept}>
          <i className="fa fa-sign-out" aria-hidden="true" />&nbsp;YES
        </Button>{' '}
        <Button color="secondary" onClick={props.toggle}>
          <i className="fa fa-times-circle" aria-hidden="true" />&nbsp;NO
        </Button>
      </ModalFooter>
    </Modal>
  </Fragment>
);
