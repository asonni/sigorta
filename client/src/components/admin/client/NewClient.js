import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import ClientForm from './ClientForm';
import { fetchUsers, newClinet } from '../../../actions/admin';

class NewClient extends Component {
  state = { alertVisible: false };

  componentDidMount() {
    document.title = 'Sigorta | New Clinet';
    this.props.fetchUsers();
  }

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  renderUsers = () =>
    this.props.users.map(({ _id, fname, lname, email }) => ({
      value: _id,
      label: `Name: ${fname} ${lname}, Email: ${email}`,
      user: {
        name: `${fname} ${lname}`,
        email
      }
    }));

  itemComponent = ({ item: { user: { name, email } } }) => (
    <span>
      <strong>Name:</strong> {name}, <strong>Email:</strong> {email}
    </span>
  );

  onSubmintNewClient = async values => {
    await this.props.newClinet(values);
    if (
      this.props.clientError.status === 400 ||
      this.props.clientError.status === 401
    ) {
      this.setState({ alertVisible: true });
    } else {
      this.props.history.push('/admin/clients/view');
    }
  };

  render() {
    return (
      <Row className="animated fadeIn">
        <Col xs="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <i className="fa fa-plus" aria-hidden="true" />New Clinet (زبون
              جديد)
            </CardHeader>
            <ClientForm
              {...this.props}
              loading={this.props.usersLoading}
              onSubmit={this.onSubmintNewClient}
              renderUsers={this.renderUsers()}
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

const mapStateToProps = ({ clientStore, userStore }) => ({
  clientError: clientStore.errors,
  users: userStore.users,
  usersLoading: userStore.loading,
  usersError: userStore.errors
});

export default connect(mapStateToProps, { newClinet, fetchUsers })(NewClient);
