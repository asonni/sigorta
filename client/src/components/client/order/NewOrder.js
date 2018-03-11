import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import OrderForm from './OrderForm';
import { fetchPlans, fetchClient } from '../../../actions/admin';
import { newOrder } from '../../../actions/client';

export class NewOrder extends Component {
  state = { alertVisible: false };

  componentDidMount() {
    document.title = 'Sigorta | New Order';
    this.props.fetchPlans();
    this.props.fetchClient(localStorage.getItem('si_clientID'));
  }

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  renderPlans = () =>
    this.props.plans.map(({ _id, name, price }) => ({
      value: _id,
      label: `Name: ${name}, Price: ${price}`,
      plan: { name, price }
    }));

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
      this.props.history.push('/client/orders/view');
    }
  };

  render() {
    const { clientLoading, plansLoading } = this.props;
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
                loading={clientLoading && plansLoading}
                onSubmit={this.onSubmintNewOrder}
                renderPlans={this.renderPlans()}
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

const mapStateToProps = ({ clientOrderStore, clientStore, planStore }) => ({
  orderLoading: clientOrderStore.loading,
  orderError: clientOrderStore.errors,
  client: clientStore.client,
  clientLoading: clientStore.loading,
  clientError: clientStore.errors,
  plans: planStore.plans,
  plansLoading: planStore.loading,
  plansError: planStore.errors
});

export default connect(mapStateToProps, {
  newOrder,
  fetchPlans,
  fetchClient
})(NewOrder);
