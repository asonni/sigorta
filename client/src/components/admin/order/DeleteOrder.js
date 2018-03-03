import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteOrder } from '../../../actions/admin';

class DeleteOrder extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmitDeleteOrder = async () => {
    try {
      await this.props.deleteOrder(this.props.orderId);
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
        <Button color="danger" onClick={this.toggle}>
          <i className="fa fa-trash" aria-hidden="true" />
          <span className="hidden-xs-down">&nbsp;Delete</span>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>Delete Order Warning!</ModalHeader>
          <ModalBody className="text-center">
            <h5 className="text-muted">
              Are you sure you want to delete this order information?
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
            <br />
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="danger"
              disabled={submitting}
              onClick={handleSubmit(this.onSubmitDeleteOrder)}
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

const mapStateToProps = ({ orderStore: { error } }) => {
  return { error };
};

const DeleteOrderModal = reduxForm({ form: 'deleteOrder' })(DeleteOrder);

export default connect(mapStateToProps, { deleteOrder })(DeleteOrderModal);
