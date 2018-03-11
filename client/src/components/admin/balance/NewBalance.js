import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import BalanceForm from './BalanceForm';
import { fetchClients, newBalance } from '../../../actions/admin';

export class NewBalance extends Component {
  state = { alertVisible: false };

  componentDidMount() {
    document.title = 'Sigorta | New Balance';
    this.props.fetchClients();
  }

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  renderClients = () =>
    this.props.clients.map(({ _id, name, user }) => ({
      value: _id,
      label: `Client Name: ${name}, User Email: ${user.email}`,
      client: {
        name,
        email: user.email
      }
    }));

  itemComponent = ({ item: { client: { name, email } } }) => (
    <span>
      <strong>Client Name:</strong> {name}, <strong>User Email:</strong> {email}
    </span>
  );

  onSubmintNewBalance = async values => {
    await this.props.newBalance(values);
    if (
      this.props.balanceErrors.status === 400 ||
      this.props.balanceErrors.status === 401
    ) {
      this.setState({ alertVisible: true });
    } else {
      this.props.history.push('/admin/balances/view');
    }
  };

  render() {
    return (
      <Row className="animated fadeIn">
        <Col xs="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <i className="fa fa-plus" aria-hidden="true" />New Balance (اضافة
              رصيد جديد)
            </CardHeader>
            <BalanceForm
              {...this.props}
              loading={this.props.clientsLoading}
              onSubmit={this.onSubmintNewBalance}
              renderClients={this.renderClients()}
              itemComponent={this.itemComponent}
              onAlertDismiss={this.onAlertDismiss}
              alertVisible={this.state.alertVisible}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ balanceStore, clientStore }) => ({
  balanceLoading: balanceStore.loading,
  balanceErrors: balanceStore.errors,
  clients: clientStore.clients,
  clientsLoading: clientStore.loading,
  clientsErrors: clientStore.error
});

export default connect(mapStateToProps, { fetchClients, newBalance })(
  NewBalance
);
