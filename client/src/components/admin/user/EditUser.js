import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import UserForm from './UserForm';
import { fetchUser, editUser } from '../../../actions/admin';

class EditUser extends PureComponent {
  state = { alertVisible: false };

  componentDidMount() {
    document.title = 'Sigorta | Edit User';
    const { id } = this.props.match.params;
    this.props.fetchUser(id);
  }

  onSubmintEditUser = async values => {
    await this.props.editUser(values);
    if (this.props.errors.status === 400 || this.props.errors.status === 401) {
      this.setState({ alertVisible: true });
    } else {
      this.props.history.push('/admin/users/view');
    }
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    return (
      <Row className="animated fadeIn">
        <Col xs="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <i className="fa fa-pencil-square-o" aria-hidden="true" />Edit
              User (تعديل المستخدم)
            </CardHeader>
            <UserForm
              {...this.props}
              onSubmit={this.onSubmintEditUser}
              onAlertDismiss={this.onAlertDismiss}
              alertVisible={this.state.alertVisible}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ userStore: { user, loading, errors } }) => ({
  user,
  loading,
  errors
});

export default connect(mapStateToProps, { fetchUser, editUser })(EditUser);
