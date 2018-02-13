import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteClient } from '../../../actions/admin';
import { Aux } from '../../common';

class DeleteClient extends Component {
  state = { deleteClientModal: false, loading: false };

  toggle = () => {
    this.setState({
      deleteClientModal: !this.state.deleteClientModal,
      loading: false
    });
  };

  onSubmitDeleteClient = async () => {
    this.setState({ loading: true });
    try {
      await this.props.deleteClient(this.props.clientId);
      this.toggle();
    } catch (err) {
      this.toggle();
      throw new SubmissionError(this.props.error);
    }
  };

  render() {
    const { clientName, clinetUserEmail, handleSubmit } = this.props;
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
              disabled={this.state.loading}
              onClick={handleSubmit(this.onSubmitDeleteClient)}
            >
              {this.state.loading ? (
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
              {this.state.loading ? 'Cancel' : 'No'}
            </Button>
          </ModalFooter>
        </Modal>
      </Aux>
    );
  }
}

const mapStateToProps = ({ clientStore: { loading, error } }) => {
  return { loading, error };
};

const DeleteClientForm = reduxForm({ form: 'deleteClient' })(DeleteClient);

export default connect(mapStateToProps, { deleteClient })(DeleteClientForm);
