import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
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
import { renderInputField } from '../../common';

class ResetPassword extends PureComponent {
  state = { alertVisible: false, popoverOpen: false };

  componentDidMount() {
    document.title = 'Sigorta | Reset Password';
    const { id } = this.props.match.params;
    this.props.fetchUser(id);
  }

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  toggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  };

  onSubmintResetPassword = async values => {
    values._id = this.props.match.params.id;
    await this.props.editUser(values);
    if (this.props.errors.status === 400 || this.props.errors.status === 401) {
      this.setState({ alertVisible: true });
    } else {
      this.props.history.push('/admin/users/view');
    }
  };

  renderAlerts = () => {
    const { errors } = this.props;
    if (errors && errors.status === 401) {
      return (
        <Alert
          color="danger"
          isOpen={this.state.alertVisible}
          toggle={this.onAlertDismiss}
        >
          You are not authorized to do this action
        </Alert>
      );
    }
    if (errors && errors.status === 400) {
      return (
        <Alert
          color="danger"
          isOpen={this.state.alertVisible}
          toggle={this.onAlertDismiss}
        >
          Something went wrong please try again later
        </Alert>
      );
    }
  };

  render() {
    const { handleSubmit, user, loading, pristine, submitting } = this.props;
    return (
      <Row className="animated fadeIn">
        <Col xs="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <i className="fa fa-pencil-square-o" aria-hidden="true" /> Reset
              Password (إعادة تعيين كلمة المرور)
            </CardHeader>
            <Form
              onSubmit={handleSubmit(this.onSubmintResetPassword)}
              loading={loading && !submitting}
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
                  label="Password (كلمة المرور)"
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
                  label="Retype Password (اعادة ادخال كلمة المرور)"
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
                    <Fragment>
                      <i className="fa fa-circle-o-notch fa-spin" /> Resetting
                    </Fragment>
                  ) : (
                    <Fragment>
                      <i className="fa fa-key" /> Reset
                    </Fragment>
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
    );
  }
}

const mapStateToProps = ({ userStore: { user, loading, errors } }) => ({
  user,
  loading,
  errors
});

const ResetPasswordForm = reduxForm({ form: 'resetPassword', validate })(
  ResetPassword
);

export default connect(mapStateToProps, { fetchUser, editUser })(
  ResetPasswordForm
);
