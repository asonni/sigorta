import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import ClientForm from './ClientForm';
import { newClinet } from '../../../actions/admin/client';
import { fetchUsers } from '../../../actions/admin/user';

class NewClinet extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | New Clinet';
    this.props.fetchUsers();
  }

  onSubmintNewClient = async values => {
    try {
      await this.props.newClinet(values);
      this.props.history.push('/admin/clients/view');
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(this.props.clientError);
    }
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  renderUsers = () =>
    this.props.users.map(item => ({
      value: item._id,
      label: `Name: ${item.fname} ${item.lname}, Email: ${item.email}`,
      user: {
        name: `${item.fname} ${item.lname}`,
        email: item.email
      }
    }));

  itemComponent = ({ item }) => (
    <span>
      <strong>Name:</strong> {item.user.name}, <strong>Email:</strong>{' '}
      {item.user.email}
    </span>
  );

  render() {
    const { userLoading } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-user-plus" aria-hidden="true" /> New Clinet
              </CardHeader>
              <ClientForm
                {...this.props}
                loading={userLoading}
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
    userLoading: userStore.loading,
    userError: userStore.error
  };
};

export default connect(mapStateToProps, { newClinet, fetchUsers })(NewClinet);
