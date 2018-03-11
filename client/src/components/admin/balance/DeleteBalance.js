import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import NumberFormat from 'react-number-format';
import {
  Alert,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';

import { deleteBalance } from '../../../actions/admin';

class DeleteBalance extends Component {
  state = { alertVisible: false };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  onCloseDeleteModal = () => {
    this.props.onCloseDeleteModal();
    this.onAlertDismiss();
  };

  onSubmitDeleteBalance = async () => {
    await this.props.deleteBalance(this.props.balance._id);
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
    const { balance, submitting, handleSubmit, showDeleteModal } = this.props;
    return (
      <Fragment>
        <Modal isOpen={showDeleteModal} toggle={this.onCloseDeleteModal}>
          <ModalHeader toggle={this.onCloseDeleteModal}>
            Delete Balance Warning!
          </ModalHeader>
          <ModalBody className="text-center">
            <Alert
              color="danger"
              toggle={this.onAlertDismiss}
              isOpen={this.state.alertVisible}
            >
              <h6 className="text-center">
                <i className="fa fa-clock-o" aria-hidden="true" />&nbsp;
                Something went wrong please try again later
              </h6>
            </Alert>
            <h5>Are you sure you want to delete this balance information?</h5>
            <br />
            <p>
              <strong>Balance:</strong>{' '}
              <NumberFormat
                decimalScale={2}
                value={balance.balance}
                displayType={'text'}
                thousandSeparator
                suffix={'TR'}
              />{' '}
              | <strong>Transaction:</strong>{' '}
              <span className="text-capitalize">{balance.transaction}</span>
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

const mapStateToProps = ({ balanceStore: { deleteErrors } }) => ({
  deleteErrors
});

const DeleteBalanceModal = reduxForm({ form: 'deleteBalance' })(DeleteBalance);

export default connect(mapStateToProps, { deleteBalance })(DeleteBalanceModal);
