import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteBalance } from '../../../actions/admin';
import { Aux } from '../../common';

class DeleteBalance extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmitDeleteBalance = async () => {
    try {
      await this.props.deleteBalance(this.props.balanceId);
      this.toggle();
    } catch (err) {
      this.toggle();
      throw new SubmissionError(this.props.error);
    }
  };

  render() {
    const {
      balance,
      balanceTransaction,
      handleSubmit,
      submitting
    } = this.props;
    return (
      <Aux>
        <Button color="danger" onClick={this.toggle}>
          <i className="fa fa-trash" aria-hidden="true" />
          <span className="hidden-xs-down">&nbsp;Delete</span>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Delete Balance Warning!
          </ModalHeader>
          <ModalBody className="text-center">
            <h5>Are you sure you want to delete this balance information?</h5>
            <br />
            <p>
              <strong>Balance:</strong> {balance}, <strong>Transaction:</strong>{' '}
              {balanceTransaction}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="danger"
              disabled={submitting}
              onClick={handleSubmit(this.onSubmitDeleteBalance)}
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

const mapStateToProps = ({ balanceStore: { error } }) => {
  return { error };
};

const DeleteBalanceModal = reduxForm({ form: 'deleteBalance' })(DeleteBalance);

export default connect(mapStateToProps, { deleteBalance })(DeleteBalanceModal);
