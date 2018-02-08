import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteClient } from '../../../actions/admin/client';
import { Aux } from '../../Common';

class DeleteClient extends Component {
  state = { deleteClientModal: false };

  toggle = () => {
    console.log(this.state.deleteClientModal);
    this.setState({ deleteClientModal: !this.state.deleteClientModal });
  };

  onSubmitDeleteClient = async () => {
    try {
      await this.props.deleteClient(this.props.clientId);
      this.toggle();
    } catch (err) {
      this.toggle();
      throw new SubmissionError(this.props.errors);
    }
  };

  render() {
    const {
      clientName,
      clinetUserEmail,
      handleSubmit,
      submitting
    } = this.props;
    return (
      <Aux>
        <Button color="danger" onClick={this.toggle}>
          <i className="fa fa-trash" aria-hidden="true" />
          <span className="hidden-xs-down">&nbsp;Delete</span>
        </Button>
        <Modal isOpen={this.state.deleteClientModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete Client Warning!</ModalHeader>
          <ModalBody className="text-center">
            <h5>Are you sure you want to delete this client information?</h5>
            <br />
            <p>
              <strong>Client Name:</strong> {clientName},{' '}
              <strong>Client Email:</strong> {clinetUserEmail}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="danger"
              disabled={submitting}
              onClick={handleSubmit(this.onSubmitDeleteClient)}
            >
              {submitting ? (
                <Aux>
                  <i className="fa fa-circle-o-notch fa-spin" />&nbsp;Deleteing
                </Aux>
              ) : (
                <Aux>
                  <i className="fa fa-trash" aria-hidden="true" />&nbsp;Yes
                </Aux>
              )}
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              <i className="fa fa-times-circle" aria-hidden="true" />&nbsp;
              {submitting ? 'Cancel' : 'No'}
            </Button>
          </ModalFooter>
        </Modal>
      </Aux>
    );
  }
}

const mapStateToProps = ({ clientStore }) => {
  const { loading, errors } = clientStore;
  return { loading, errors };
};

const DeleteClientForm = reduxForm({ form: 'deleteClient' })(DeleteClient);

export default connect(mapStateToProps, { deleteClient })(DeleteClientForm);
