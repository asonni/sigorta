import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import OrderForm from './OrderForm';
import { fetchClients, fetchPlans, newOrder } from '../../../actions/admin';

export class NewOrder extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | New Order';
    this.props.fetchClients();
    this.props.fetchPlans();
  }

  onSubmintNewOrder = async values => {
    console.log(values);
    const { newOrder, history, orderError } = this.props;
    try {
      await newOrder(values);
      history.push('/admin/orders/view');
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(orderError);
    }
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  renderClients = () =>
    this.props.clients.map(({ _id, name, user, discount }) => ({
      value: _id,
      label: `Client Name: ${name}, User Email: ${user.email}`,
      client: {
        name,
        discount,
        email: user.email
      }
    }));

  renderPlans = () =>
    this.props.plans.map(({ _id, name, price }) => ({
      value: _id,
      label: `Name: ${name}, Price: ${price}`,
      plan: { name, price }
    }));

  itemClientComponent = ({ item: { client: { name, email } } }) => (
    <span>
      <strong>Client Name:</strong> {name}, <strong>User Email:</strong> {email}
    </span>
  );

  itemPlanComponent = ({ item: { plan: { name, price } } }) => (
    <span>
      <strong>Name:</strong> {name}, <strong>Price:</strong> {price}
    </span>
  );

  render() {
    const { clientsLoading, plansLoading } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-plus" aria-hidden="true" /> New Order
              </CardHeader>
              <OrderForm
                {...this.props}
                loading={clientsLoading && plansLoading}
                onSubmit={this.onSubmintNewOrder}
                renderClients={this.renderClients()}
                renderPlans={this.renderPlans()}
                itemClientComponent={this.itemClientComponent}
                itemPlanComponent={this.itemPlanComponent}
                onAlertDismiss={this.onAlertDismiss}
                alertVisible={this.state.alertVisible}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ orderStore, clientStore, planStore }) => {
  return {
    orderLoading: orderStore.loading,
    orderError: orderStore.error,
    clients: clientStore.clients,
    clientsLoading: clientStore.loading,
    clientsError: clientStore.error,
    plans: planStore.plans,
    plansLoading: planStore.loading,
    plansError: planStore.error
  };
};

export default connect(mapStateToProps, { fetchClients, fetchPlans, newOrder })(
  NewOrder
);
