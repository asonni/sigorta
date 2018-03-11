import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteUser } from '../../../actions/admin';

class DeleteUser extends PureComponent {
  state = { alertVisible: false };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  onCloseDeleteModal = () => {
    this.props.onCloseDeleteModal();
    this.onAlertDismiss();
  };

  onSubmitDeleteUser = async () => {
    await this.props.deleteUser(this.props.user._id);
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
      user: { fname, lname, email }
    } = this.props;
    return (
      <Fragment>
        <Modal isOpen={showDeleteModal} toggle={this.onCloseDeleteModal}>
          <ModalHeader toggle={this.onCloseDeleteModal}>
            Delete User Warning!
          </ModalHeader>
          <ModalBody className="text-center">
            <h5>Are you sure you want to delete this user information?</h5>
            <br />
            <p>
              <strong>Name:</strong> {fname} {lname}, <strong>Email:</strong>{' '}
              {email}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="danger"
              disabled={submitting}
              onClick={handleSubmit(this.onSubmitDeleteUser)}
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
      </Fragment>
    );
  }
}

const mapStateToProps = ({ userStore: { deleteUser } }) => ({ deleteUser });

const DeleteUserModal = reduxForm({ form: 'deleteUser' })(DeleteUser);

export default connect(mapStateToProps, { deleteUser })(DeleteUserModal);
