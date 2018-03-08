import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import OrderForm from './OrderForm';
import { fetchPlans, fetchClient } from '../../../actions/admin';
import { newOrder } from '../../../actions/client';

export class NewOrder extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | New Order';
    this.props.fetchPlans();
    this.props.fetchClient(localStorage.getItem('si_clientID'));
  }

  onSubmintNewOrder = async values => {
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

const mapStateToProps = ({ clientOrderStore, clientStore, planStore }) => {
  return {
    orderLoading: clientOrderStore.loading,
    orderError: clientOrderStore.error,
    client: clientStore.client,
    clientLoading: clientStore.loading,
    clientError: clientStore.error,
    plans: planStore.plans,
    plansLoading: planStore.loading,
    plansError: planStore.error
  };
};

export default connect(mapStateToProps, {
  newOrder,
  fetchPlans,
  fetchClient
})(NewOrder);
