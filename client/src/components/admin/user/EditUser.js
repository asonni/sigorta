import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import UserForm from './UserForm';
import { fetchUser, editUser } from '../../../actions/admin';

class EditUser extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | Edit User';
    const { id } = this.props.match.params;
    this.props.fetchUser(id);
  }

  onSubmintEditUser = async values => {
    try {
      await this.props.editUser(values);
      this.props.history.push('/admin/users/view');
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(this.props.error);
    }
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit
                User
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
      </div>
    );
  }
}

const mapStateToProps = ({ userStore: { user, loading, error } }) => {
  return { user, loading, error };
};

export default connect(mapStateToProps, { fetchUser, editUser })(EditUser);
