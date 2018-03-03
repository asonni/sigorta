import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteUser } from '../../../actions/admin';

class DeleteUser extends PureComponent {
  state = { modal: false };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onSubmitDeleteUser = async () => {
    try {
      await this.props.deleteUser(this.props.userId);
      this.toggle();
    } catch (err) {
      this.toggle();
      throw new SubmissionError(this.props.error);
    }
  };

  render() {
    const { userFullName, userEmail, handleSubmit, submitting } = this.props;
    return (
      <Fragment>
        <Button color="danger" onClick={this.toggle}>
          <i className="fa fa-trash" aria-hidden="true" />
          <span className="hidden-xs-down">&nbsp;Delete</span>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete User Warning!</ModalHeader>
          <ModalBody className="text-center">
            <h5>Are you sure you want to delete this user information?</h5>
            <br />
            <p>
              <strong>Name:</strong> {userFullName}, <strong>Email:</strong>{' '}
              {userEmail}
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

const mapStateToProps = ({ userStore: { loading, error } }) => {
  return { loading, error };
};

const DeleteUserModal = reduxForm({ form: 'deleteUser' })(DeleteUser);

export default connect(mapStateToProps, { deleteUser })(DeleteUserModal);
