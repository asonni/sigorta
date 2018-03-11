import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { reduxForm } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { approveOrder } from '../../../actions/admin';

class ApproveOrder extends Component {
  state = { alertVisible: false, selectedFile: null };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  onCloseApproveModal = () => {
    this.props.onCloseApproveModal();
    this.onAlertDismiss();
  };

  fileSelectdHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onSubmitApproveOrder = async () => {
    await this.props.approveOrder(this.props.order._id);
    if (
      this.props.approveErrors.status === 400 ||
      this.props.approveErrors.status === 401
    ) {
      this.setState({ alertVisible: true });
    } else {
      this.onCloseApproveModal();
    }
  };

  render() {
    const { order, handleSubmit, submitting, showApproveModal } = this.props;
    return (
      <Modal
        isOpen={showApproveModal}
        toggle={this.onCloseApproveModal}
        size="lg"
      >
        <ModalHeader toggle={this.onCloseApproveModal}>
          Approve Order Warning!
        </ModalHeader>
        <ModalBody className="text-center">
          <h5 className="text-muted">
            Are you sure you want to approve this order information?
          </h5>
          <br />
          <div className="text-muted">
            <strong>Full Name:</strong>{' '}
            <span className="text-capitalize">{order.name}</span>
          </div>
          <div className="small text-muted">
            <span className="text-capitalize">
              <strong>Gender:</strong> {order.gender}
            </span>{' '}
            | <strong>Date of Birth:</strong>{' '}
            <Moment format="MMMM DD, YYYY">{order.dob}</Moment> |{' '}
            <strong>Nationality:</strong> {order.nationality} |{' '}
            <strong>Passport:</strong>{' '}
            <span className="text-uppercase">{order.passport}</span>
            <br />
            <strong>Number of Years:</strong>{' '}
            {order.numberOfYears === 1 ? 'One Year' : 'Two Years'} |{' '}
            <strong>Address:</strong>{' '}
            <span className="text-capitalize">{order.address}</span> |{' '}
            <strong>Phone:</strong> <span>{order.phone}</span>
            <br />
            <strong>Father Name:</strong>{' '}
            <span className="text-capitalize">
              {order.fatherName ? order.fatherName : 'N/A'}
            </span>| <strong>Father Passport:</strong>{' '}
            <span className="text-uppercase">
              {order.fatherPassport ? order.fatherPassport : 'N/A'}
            </span>
            <br />
            <strong>Mother Name:</strong>{' '}
            <span className="text-capitalize">
              {order.motherName ? order.motherName : 'N/A'}
            </span>| <strong>Mother Passport:</strong>{' '}
            <span className="text-uppercase">
              {order.motherPassport ? order.motherPassport : 'N/A'}
            </span>
            <br />
            <strong>Price:</strong>{' '}
            <NumberFormat
              decimalScale={2}
              value={order.price}
              displayType={'text'}
              thousandSeparator
              suffix={'TR'}
            />{' '}
            | <strong>Total Price:</strong>{' '}
            <NumberFormat
              decimalScale={2}
              value={order.totalPrice}
              displayType={'text'}
              thousandSeparator
              suffix={'TR'}
            />{' '}
            | <strong>Total Price After Discount:</strong>{' '}
            <NumberFormat
              decimalScale={2}
              value={order.totalPriceAfterDiscount}
              displayType={'text'}
              thousandSeparator
              suffix={'TR'}
            />
          </div>
          <hr />
          <strong className="text-muted pr-2">Approved Document</strong>
          <input
            style={{ display: 'none' }}
            type="file"
            onChange={this.fileSelectdHandler}
            ref={fileInput => (this.fileInput = fileInput)}
          />
          <Button size="sm" onClick={() => this.fileInput.click()}>
            Pick a document
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="success"
            disabled={submitting}
            onClick={handleSubmit(this.onSubmitApproveOrder)}
          >
            {submitting ? (
              <Fragment>
                <i className="fa fa-circle-o-notch fa-spin" />&nbsp;Approving
              </Fragment>
            ) : (
              <Fragment>
                <i className="fa fa-thumbs-up" aria-hidden="true" />&nbsp;Approve
              </Fragment>
            )}
          </Button>{' '}
          <Button color="secondary" onClick={this.onCloseApproveModal}>
            <i className="fa fa-times-circle" aria-hidden="true" />&nbsp; Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ orderStore: { approveErrors } }) => ({
  approveErrors
});

const ApproveOrderModal = reduxForm({ form: 'approveOrder' })(ApproveOrder);

export default connect(mapStateToProps, { approveOrder })(ApproveOrderModal);
