import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import ClientForm from './ClientForm';
import { fetchUsers, newClinet } from '../../../actions/admin';

class NewClient extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | New Clinet';
    this.props.fetchUsers();
  }

  onSubmintNewClient = async values => {
    const { newClinet, history, clientError } = this.props;
    try {
      await newClinet(values);
      history.push('/admin/clients/view');
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(clientError);
    }
  };

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

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-plus" aria-hidden="true" /> New Clinet
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
      </div>
    );
  }
}

const mapStateToProps = ({ clientStore, userStore }) => {
  return {
    clientLoading: clientStore.loading,
    clientError: clientStore.error,
    users: userStore.users,
    usersLoading: userStore.loading,
    usersError: userStore.error
  };
};

export default connect(mapStateToProps, { newClinet, fetchUsers })(NewClient);
