import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import NumberFormat from 'react-number-format';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteClient } from '../../../actions/admin';

class DeleteClient extends Component {
  state = { alertVisible: false };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  onCloseDeleteModal = () => {
    this.props.onCloseDeleteModal();
    this.onAlertDismiss();
  };

  onSubmitDeleteClient = async () => {
    await this.props.deleteClient(this.props.client._id);
    if (
      this.props.deleteErrors.status === 400 ||
      this.props.deleteErrors.status === 401
    ) {
      this.setState({ alertVisible: true });
    } else {
      this.onCloseDeleteModal();
    }
  };

  render() {
    const {
      submitting,
      handleSubmit,
      showDeleteModal,
      client: { name, discount, balance, username, email }
    } = this.props;
    return (
      <Modal isOpen={showDeleteModal} toggle={this.onCloseDeleteModal}>
        <ModalHeader toggle={this.onCloseDeleteModal}>
          Delete Client Warning!
        </ModalHeader>
        <ModalBody className="text-center">
          <h5>Are you sure you want to delete this client information?</h5>
          <br />
          <p>
            <strong>Name:</strong> {name} | <strong>Discount:</strong>{' '}
            {discount}% | <strong>Balance:</strong>{' '}
            <NumberFormat
              decimalScale={2}
              value={balance}
              displayType={'text'}
              thousandSeparator
              suffix={'TR'}
            />{' '}
            <br />
            <strong>User Name:</strong> {username} <br />
            <strong>User Email:</strong> {email}
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
          <Button color="secondary" onClick={this.onCloseDeleteModal}>
            <i className="fa fa-times-circle" aria-hidden="true" />&nbsp;
            {submitting ? 'Cancel' : 'No'}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ clientStore: { deleteErrors } }) => ({
  deleteErrors
});

const DeleteClientModal = reduxForm({ form: 'deleteClient' })(DeleteClient);

export default connect(mapStateToProps, { deleteClient })(DeleteClientModal);
