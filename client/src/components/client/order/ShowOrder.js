import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  Table,
  Alert,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import { fetchOrder } from '../../../actions/admin';
import { LoadingContent, ErrorMessage } from '../../common';

class ShowOrder extends Component {
  state = { modal: false };

  onOpenShowOrderModal = () => {
    this.setState({ modal: true });
    this.props.fetchOrder(this.props.orderID);
  };

  onCloseShowOrderModal = () => {
    this.setState({ modal: false });
  };

  renderOrderInfo = () => {
    const { order, loading, errors } = this.props;
    const { client } = order;
    if (loading) {
      return <LoadingContent />;
    }
    if (errors.status === 400) {
      return <ErrorMessage />;
    }
    if (order) {
      return (
        <Fragment>
          <Alert color="info" style={{ marginBottom: 0, paddingTop: '20px' }}>
            <h5 className="text-center">
              <strong>Client Name:</strong>{' '}
              {client ? client.name : 'Loading...'}, <strong>Balance:</strong>{' '}
              {client ? client.balance : 'Loading...'}
            </h5>
          </Alert>
          <Table responsive striped size="sm">
            <thead className="thead-light">
              <tr>
                <th className="text-center">Full Name</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Date of Birthday</th>
                <th className="text-center">Nationality</th>
                <th className="text-center">Passport</th>
                <th className="text-center">Phone</th>
                <th className="text-center">Price</th>
                <th className="text-center">Total Price</th>
                <th className="text-center">Total Price After Discount</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.name}</td>
                <td className="text-capitalize">{order.gender}</td>
                <td>
                  <Moment format="MMMM DD, YYYY">{order.dob}</Moment>
                </td>
                <td>{order.nationality}</td>
                <td>{order.passport}</td>
                <td>{order.phone}</td>
                <td>{order.price}</td>
                <td>{order.totalPrice}</td>
                <td>{order.totalPriceAfterDiscount}</td>
                <td>
                  <h5>
                    <Badge
                      pill
                      color={order.status === 'pending' ? 'warning' : 'success'}
                    >
                      {order.status === 'pending' ? 'Pending' : 'Approved'}
                    </Badge>
                  </h5>
                </td>
              </tr>
            </tbody>
          </Table>
        </Fragment>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <Button color="info" onClick={this.onOpenShowOrderModal}>
          <i className="fa fa-shopping-cart" aria-hidden="true" />
          <span className="hidden-xs-down">&nbsp;Show Order</span>
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.onCloseShowOrderModal}
          className="modal-xlg"
        >
          <ModalHeader toggle={this.onCloseShowOrderModal}>
            Show Order Info
          </ModalHeader>
          <ModalBody className="text-center">
            {this.renderOrderInfo()}
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.onCloseShowOrderModal}>
              <i className="fa fa-check-square-o" aria-hidden="true" />&nbsp; OK
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ orderStore: { order, loading, errors } }) => ({
  order,
  loading,
  errors
});

export default connect(mapStateToProps, { fetchOrder })(ShowOrder);
