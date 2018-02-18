import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import BalanceForm from './BalanceForm';
import { fetchClients, newBalance } from '../../../actions/admin';

class NewBalance extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | New Balance';
    this.props.fetchClients();
  }

  onSubmintNewBalance = async values => {
    console.log(values);
    const { newBalance, history, balanceError } = this.props;
    try {
      await newBalance(values);
      history.push('/admin/balances/view');
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(balanceError);
    }
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  renderClients = () =>
    this.props.clients.map(({ _id, name, user }) => ({
      value: _id,
      label: `Client Name: ${name}, User Email: ${user.name}`,
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

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-plus" aria-hidden="true" /> New Balance
              </CardHeader>
              <BalanceForm
                {...this.props}
                loading={this.props.clientsLoading}
                onSubmit={this.onSubmintNewBalance}
                renderClients={this.renderClients()}
                rendersTransactions={[
                  { value: 'add', label: 'Add' },
                  { value: 'substract', label: 'Substract' }
                ]}
                itemComponent={this.itemComponent}
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

const mapStateToProps = ({ balanceStore, clientStore }) => {
  return {
    balanceLoading: balanceStore.loading,
    balanceError: balanceStore.error,
    clients: clientStore.clients,
    clientsLoading: clientStore.loading,
    clientsError: clientStore.error
  };
};

export default connect(mapStateToProps, { fetchClients, newBalance })(
  NewBalance
);
