import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import OrderForm from './OrderForm';
import { fetchClients, fetchPlans, newOrder } from '../../../actions/admin';

export class NewOrder extends Component {
  state = { alertVisible: false };

  componentDidMount() {
    document.title = 'Sigorta | New Order';
    this.props.fetchClients();
    this.props.fetchPlans();
  }

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

  onSubmintNewOrder = async values => {
    await this.props.newOrder(values);
    if (
      this.props.orderError.status === 400 ||
      this.props.orderError.status === 401
    ) {
      this.setState({ alertVisible: true });
    } else {
      this.props.history.push('/admin/orders/view');
    }
  };

  render() {
    const { clientsLoading, plansLoading } = this.props;
    return (
      <Row className="animated fadeIn">
        <Col xs="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <i className="fa fa-plus" aria-hidden="true" />New Order (طلب
              جديد)
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
    );
  }
}

const mapStateToProps = ({ orderStore, clientStore, planStore }) => ({
  orderLoading: orderStore.loading,
  orderError: orderStore.errors,
  clients: clientStore.clients,
  clientsLoading: clientStore.loading,
  clientsError: clientStore.errors,
  plans: planStore.plans,
  plansLoading: planStore.loading,
  plansError: planStore.errors
});

export default connect(mapStateToProps, { fetchClients, fetchPlans, newOrder })(
  NewOrder
);
