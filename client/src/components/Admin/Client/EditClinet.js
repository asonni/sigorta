import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import ClientForm from './ClientForm';
import { fetchClient, editClinet } from '../../../actions/admin/client';
import { fetchUsers } from '../../../actions/admin/user';

class EditClinet extends Component {
  state = { alertVisible: true };

  componentWillMount() {
    document.title = 'Sigorta | Edit Clinet';
    const { id } = this.props.match.params;
    this.props.fetchClient(id);
    this.props.fetchUsers();
  }

  onSubmintEditClient = async values => {
    try {
      await this.props.editClinet(values);
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
    const { clientLoading, userLoading } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-user-plus" aria-hidden="true" /> Edit Clinet
              </CardHeader>
              <ClientForm
                {...this.props}
                loading={clientLoading && userLoading}
                onSubmit={this.onSubmintEditClient}
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
    client: clientStore.client,
    clientLoading: clientStore.loading,
    clientError: clientStore.error,
    users: userStore.users,
    userLoading: userStore.loading,
    userError: userStore.error
  };
};

export default connect(mapStateToProps, {
  fetchClient,
  editClinet,
  fetchUsers
})(EditClinet);
