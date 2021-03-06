import React, { PureComponent, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  Alert,
  Button,
  CardBody,
  CardFooter,
  Popover,
  PopoverBody
} from 'reactstrap';

import validate from './validate';
import { renderInputField } from '../../common';

class UserForm extends PureComponent {
  state = { popoverOpen: false };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Load Contact Asynchronously
    const { user } = nextProps;
    if (user && user._id !== this.props.user._id) {
      // Initialize form only once
      this.props.initialize(user);
    }
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  renderAlerts = () => {
    const { alertVisible, onAlertDismiss, errors } = this.props;
    if (errors && errors.status === 401) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          You are not authorized to do this action
        </Alert>
      );
    }
    if (errors && errors.status === 400) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {errors.message}
        </Alert>
      );
    }
  };

  render() {
    const { handleSubmit, loading, pristine, submitting } = this.props;
    return (
      <Form onSubmit={handleSubmit} loading={loading && !submitting}>
        <CardBody>
          {this.renderAlerts()}
          <Field
            label="First Name (الاسم الأول)"
            placeholder="John"
            type="text"
            name="fname"
            component={renderInputField}
          />
          <Field
            label="Last Name (اللقب)"
            placeholder="Doe"
            type="text"
            name="lname"
            component={renderInputField}
          />
          <Field
            label="Email Address (البريد الالكتروني)"
            placeholder="john.doe@example.com"
            type="text"
            name="email"
            component={renderInputField}
          />
          {!this.props.user && (
            <Fragment>
              <Field
                label="Password (كلمة المرور)"
                placeholder="Password"
                type="password"
                name="password"
                id="passwordComplexRules"
                onFocus={this.toggle}
                component={renderInputField}
              />
              <Popover
                placement="top"
                isOpen={this.state.popoverOpen}
                target="passwordComplexRules"
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
            </Fragment>
          )}
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
                <i className="fa fa-circle-o-notch fa-spin" /> Submitting
              </Fragment>
            ) : (
              <Fragment>
                <i className="fa fa-dot-circle-o" /> Submit
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
    );
  }
}

export default reduxForm({ form: 'userForm', validate })(UserForm);
