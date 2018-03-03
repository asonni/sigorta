import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { approveOrder } from '../../../actions/admin';

class ApproveOrder extends Component {
  state = { modal: false, selectedFile: null };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  fileSelectdHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onSubmitApproveOrder = async () => {
    try {
      await this.props.approveOrder(this.props.orderId);
      this.toggle();
    } catch (err) {
      this.toggle();
      throw new SubmissionError(this.props.error);
    }
  };

  render() {
    const { orderObj, handleSubmit, submitting } = this.props;
    return (
      <Fragment>
        <Button color="success" onClick={this.toggle}>
          <i className="fa fa-thumbs-up" aria-hidden="true" />
          <span className="hidden-xs-down">&nbsp;Approve</span>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>Approve Order Warning!</ModalHeader>
          <ModalBody className="text-center">
            <h5 className="text-muted">
              Are you sure you want to approve this order information?
            </h5>
            <br />
            <div className="text-muted">
              <strong>Full Name:</strong>{' '}
              <span className="text-capitalize">{orderObj.name}</span>
            </div>
            <div className="small text-muted">
              <span className="text-capitalize">
                <strong>Gender:</strong> {orderObj.gender}
              </span>{' '}
              | <strong>Date of Birth:</strong>{' '}
              <Moment format="MMMM DD, YYYY">{orderObj.dob}</Moment> |{' '}
              <strong>Nationality:</strong> {orderObj.nationality} |{' '}
              <strong>Passport:</strong>{' '}
              <span className="text-uppercase">{orderObj.passport}</span>
              <br />
              <strong>Number of Years:</strong>{' '}
              {orderObj.numberOfYears === 1 ? 'One Year' : 'Two Years'} |{' '}
              <strong>Address:</strong>{' '}
              <span className="text-capitalize">{orderObj.address}</span> |{' '}
              <strong>Phone:</strong> <span>{orderObj.phone}</span>
              <br />
              <strong>Father Name:</strong>{' '}
              <span className="text-capitalize">
                {orderObj.fatherName ? orderObj.fatherName : 'N/A'}
              </span>| <strong>Father Passport:</strong>{' '}
              <span className="text-uppercase">
                {orderObj.fatherPassport ? orderObj.fatherPassport : 'N/A'}
              </span>
              <br />
              <strong>Mother Name:</strong>{' '}
              <span className="text-capitalize">
                {orderObj.motherName ? orderObj.motherName : 'N/A'}
              </span>| <strong>Mother Passport:</strong>{' '}
              <span className="text-uppercase">
                {orderObj.motherPassport ? orderObj.motherPassport : 'N/A'}
              </span>
              <br />
              <strong>Price:</strong>{' '}
              <NumberFormat
                value={orderObj.price}
                displayType={'text'}
                thousandSeparator
                suffix={'TLY'}
              />{' '}
              | <strong>Total Price:</strong>{' '}
              <NumberFormat
                value={orderObj.totalPrice}
                displayType={'text'}
                thousandSeparator
                suffix={'TLY'}
              />{' '}
              | <strong>Total Price After Discount:</strong>{' '}
              <NumberFormat
                value={orderObj.totalPriceAfterDiscount}
                displayType={'text'}
                thousandSeparator
                suffix={'TLY'}
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
            <Button color="secondary" onClick={this.toggle}>
              <i className="fa fa-times-circle" aria-hidden="true" />&nbsp;
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ orderStore: { error } }) => {
  return { error };
};

const ApproveOrderModal = reduxForm({ form: 'approveOrder' })(ApproveOrder);

export default connect(mapStateToProps, { approveOrder })(ApproveOrderModal);
