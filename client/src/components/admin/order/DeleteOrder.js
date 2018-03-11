import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { reduxForm } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deleteOrder } from '../../../actions/admin';

class DeleteOrder extends Component {
  state = { alertVisible: false };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  onCloseDeleteModal = () => {
    this.props.onCloseDeleteModal();
    this.onAlertDismiss();
  };

  onSubmitDeleteOrder = async () => {
    await this.props.deleteOrder(this.props.order._id);
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
    const { order, handleSubmit, submitting, showDeleteModal } = this.props;
    return (
      <Modal
        isOpen={showDeleteModal}
        toggle={this.onCloseDeleteModal}
        size="lg"
      >
        <ModalHeader toggle={this.onCloseDeleteModal}>
          Delete Order Warning!
        </ModalHeader>
        <ModalBody className="text-center">
          <h5 className="text-muted">
            Are you sure you want to delete this order information?
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
          <Button color="secondary" onClick={this.onCloseDeleteModal}>
            <i className="fa fa-times-circle" aria-hidden="true" />&nbsp;
            {submitting ? 'Cancel' : 'No'}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ orderStore: { deleteErrors } }) => ({
  deleteErrors
});

const DeleteOrderModal = reduxForm({ form: 'deleteOrder' })(DeleteOrder);

export default connect(mapStateToProps, { deleteOrder })(DeleteOrderModal);
