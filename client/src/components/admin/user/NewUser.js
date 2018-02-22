import React, { PureComponent } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import UserForm from './UserForm';
import { newUser } from '../../../actions/admin';

class NewUser extends PureComponent {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | New User';
  }

  onSubmintNewUser = async values => {
    try {
      await this.props.newUser(values);
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
                <i className="fa fa-user-plus" aria-hidden="true" /> New User
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
      </div>
    );
  }
}

const mapStateToProps = ({ userStore: { loading, error } }) => {
  return { loading, error };
};

export default connect(mapStateToProps, { newUser })(NewUser);
