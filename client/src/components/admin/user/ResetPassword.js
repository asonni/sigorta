import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
  Row,
  Col,
  Card,
  Alert,
  Button,
  Popover,
  CardBody,
  CardFooter,
  CardHeader,
  PopoverBody
} from 'reactstrap';

import validate from './validate';
import { fetchUser, editUser } from '../../../actions/admin';
import {
  Aux,
  ErrorMessage,
  renderInputField,
  AuthorizedMessage
} from '../../common';

class ResetPassword extends PureComponent {
  state = { alertVisible: false, popoverOpen: false };

  componentWillMount() {
    document.title = 'Sigorta | Reset Password';
    const { id } = this.props.match.params;
    this.props.fetchUser(id);
  }

  onSubmintResetPassword = async values => {
    values._id = this.props.match.params.id;
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

  toggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  };

  renderAlerts = () => {
    const { onAlertDismiss, error } = this.props;
    if (error === undefined) {
      return (
        <Alert
          color="danger"
          isOpen={this.state.alertVisible}
          toggle={onAlertDismiss}
        >
          <AuthorizedMessage />
        </Alert>
      );
    }
    if (error) {
      return (
        <Alert
          color="danger"
          isOpen={this.state.alertVisible}
          toggle={onAlertDismiss}
        >
          <ErrorMessage />
        </Alert>
      );
    }
  };

  render() {
    const { handleSubmit, user, loading, pristine, submitting } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Reset
                Password
              </CardHeader>
              <Form
                onSubmit={handleSubmit(this.onSubmintResetPassword)}
                loading={loading}
              >
                <CardBody>
                  {this.renderAlerts()}
                  <Alert color="info text-center">
                    <h5>Reset password for this user information</h5>
                    <h6 className="text-center">
                      <strong>Name:</strong>{' '}
                      {user.fname && user.lname
                        ? `${user.fname} ${user.lname}`
                        : 'Loading...'}, <strong>Email:</strong>{' '}
                      {user.email ? user.email : 'Loading...'}
                    </h6>
                  </Alert>
                  <Field
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    id="passwordRule"
                    onFocus={this.toggle}
                    component={renderInputField}
                  />
                  <Popover
                    placement="top"
                    isOpen={this.state.popoverOpen}
                    target="passwordRule"
                    toggle={this.toggle}
                  >
                    <PopoverBody>
                      The password must be at least 8 digits long.
                    </PopoverBody>
                  </Popover>
                  <Field
                    label="Retype Password"
                    placeholder="Retype password"
                    type="password"
                    name="confirmPassword"
                    component={renderInputField}
                  />
                </CardBody>
                <CardFooter>
                  <Button
                    type="submit"
                    size="sm"
                    color="primary"
                    disabled={pristine || submitting}
                  >
                    {submitting ? (
                      <Aux>
                        <i className="fa fa-circle-o-notch fa-spin" />{' '}
                        Submitting
                      </Aux>
                    ) : (
                      <Aux>
                        <i className="fa fa-dot-circle-o" /> Submit
                      </Aux>
                    )}
                  </Button>{' '}
                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() => this.props.history.push('/admin/users/view')}
                  >
                    <i className="fa fa-ban" /> Cancel
                  </Button>
                </CardFooter>
              </Form>
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

const ResetPasswordForm = reduxForm({ form: 'resetPassword', validate })(
  ResetPassword
);

export default connect(mapStateToProps, { fetchUser, editUser })(
  ResetPasswordForm
);
