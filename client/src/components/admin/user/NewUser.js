import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import UserForm from './UserForm';
import { newUser } from '../../../actions/admin';

class NewUser extends PureComponent {
  state = { alertVisible: false };

  componentDidMount() {
    document.title = 'Sigorta | New User';
  }

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  onSubmintNewUser = async values => {
    await this.props.newUser(values);
    if (this.props.errors.status === 400 || this.props.errors.status === 401) {
      this.setState({ alertVisible: true });
    } else {
      this.props.history.push('/admin/users/view');
    }
  };

  render() {
    return (
      <Row className="animated fadeIn">
        <Col xs="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <i className="fa fa-user-plus" aria-hidden="true" />New User
              (مستخدم جديد)
            </CardHeader>
            <UserForm
              {...this.props}
              onSubmit={this.onSubmintNewUser}
              onAlertDismiss={this.onAlertDismiss}
              alertVisible={this.state.alertVisible}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ userStore: { loading, errors } }) => ({
  loading,
  errors
});

export default connect(mapStateToProps, { newUser })(NewUser);
