import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import BalanceForm from './BalanceForm';
import {
  fetchBalance,
  editBalance,
  fetchClients
} from '../../../actions/admin';

class EditBalance extends Component {
  state = { alertVisible: true };

  componentWillMount() {
    document.title = 'Sigorta | Edit Balance';
    const {
      fetchBalance,
      fetchClients,
      match: { params: { id } }
    } = this.props;
    fetchBalance(id);
    fetchClients();
  }

  onSubmintEditBalance = async values => {
    const { editBalance, history, clientError } = this.props;
    try {
      await editBalance(values);
      history.push('/admin/clients/view');
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(clientError);
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
    const { balanceLoading, fetchClients } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-user-plus" aria-hidden="true" /> Edit
                Balance
              </CardHeader>
              <BalanceForm
                {...this.props}
                loading={balanceLoading && fetchClients}
                onSubmit={this.onSubmintEditClient}
                renderUsers={this.renderClients()}
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
    balance: balanceStore.balance,
    balanceLoading: balanceStore.loading,
    balanceError: balanceStore.error,
    clients: clientStore.clients,
    clientsLoading: clientStore.loading,
    clientsError: clientStore.error
  };
};

export default connect(mapStateToProps, {
  fetchBalance,
  editBalance,
  fetchClients
})(EditBalance);
