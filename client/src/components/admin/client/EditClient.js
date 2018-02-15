import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import ClientForm from './ClientForm';
import { fetchClient, fetchUsers, editClinet } from '../../../actions/admin';

class EditClient extends Component {
  state = { alertVisible: true };

  componentWillMount() {
    document.title = 'Sigorta | Edit Clinet';
    const { fetchClient, fetchUsers, match: { params: { id } } } = this.props;
    fetchClient(id);
    fetchUsers();
  }

  onSubmintEditClient = async values => {
    const { editClinet, history, clientError } = this.props;
    try {
      await editClinet(values);
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
    const { clientLoading, usersLoading } = this.props;
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
                loading={clientLoading && usersLoading}
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
    usersLoading: userStore.loading,
    usersError: userStore.error
  };
};

export default connect(mapStateToProps, {
  fetchClient,
  editClinet,
  fetchUsers
})(EditClient);
