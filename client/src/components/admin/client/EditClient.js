import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import ClientForm from './ClientForm';
import { fetchClient, fetchUsers, editClinet } from '../../../actions/admin';

class EditClient extends Component {
  state = { alertVisible: true };

  componentDidMount() {
    document.title = 'Sigorta | Edit Clinet';
    const { fetchClient, fetchUsers, match: { params: { id } } } = this.props;
    fetchClient(id);
    fetchUsers();
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

  onSubmintEditClient = async values => {
    await this.props.editClinet(values);
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
    const { clientLoading, usersLoading } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-pencil-square-o" aria-hidden="true" />Edit
                Clinet (تعديل زبون)
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

const mapStateToProps = ({ clientStore, userStore }) => ({
  client: clientStore.client,
  clientLoading: clientStore.loading,
  clientError: clientStore.errors,
  users: userStore.users,
  usersLoading: userStore.loading,
  usersError: userStore.errors
});

export default connect(mapStateToProps, {
  fetchClient,
  editClinet,
  fetchUsers
})(EditClient);
