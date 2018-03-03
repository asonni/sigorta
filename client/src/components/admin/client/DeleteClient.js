import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteClient } from '../../../actions/admin';

class DeleteClient extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmitDeleteClient = async () => {
    try {
      await this.props.deleteClient(this.props.clientId);
      this.toggle();
    } catch (err) {
      this.toggle();
      throw new SubmissionError(this.props.error);
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
      <Fragment>
        <Button color="danger" onClick={this.toggle}>
          <i className="fa fa-trash" aria-hidden="true" />
          <span className="hidden-xs-down">&nbsp;Delete</span>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
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
                <Fragment>
                  <i className="fa fa-circle-o-notch fa-spin" />&nbsp;Deleteing
                </Fragment>
              ) : (
                <Fragment>
                  <i className="fa fa-trash" aria-hidden="true" />&nbsp;Yes
                </Fragment>
              )}
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              <i className="fa fa-times-circle" aria-hidden="true" />&nbsp;
              {submitting ? 'Cancel' : 'No'}
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ clientStore: { error } }) => {
  return { error };
};

const DeleteClientModal = reduxForm({ form: 'deleteClient' })(DeleteClient);

export default connect(mapStateToProps, { deleteClient })(DeleteClientModal);
