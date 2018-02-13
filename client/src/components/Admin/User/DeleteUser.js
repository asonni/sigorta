import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteUser } from '../../../actions/admin';
import { Aux } from '../../common';

class DeleteUser extends Component {
  state = { deleteUserModal: false };

  toggle = () => {
    this.setState({ deleteUserModal: !this.state.deleteUserModal });
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
      <Aux>
        <Button color="danger" onClick={this.toggle}>
          <i className="fa fa-trash" aria-hidden="true" />
          <span className="hidden-xs-down">&nbsp;Delete</span>
        </Button>
        <Modal isOpen={this.state.deleteUserModal} toggle={this.toggle}>
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

const mapStateToProps = ({ userStore: { loading, error } }) => {
  return { loading, error };
};

const DeleteUserForm = reduxForm({ form: 'deleteUser' })(DeleteUser);

export default connect(mapStateToProps, { deleteUser })(DeleteUserForm);
