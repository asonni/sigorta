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
import {
  ErrorMessage,
  renderInputField,
  AuthorizedMessage
} from '../../common';

class UserForm extends PureComponent {
  state = {
    popoverOpen: false
  };

  componentWillReceiveProps(nextProps) {
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
    const { alertVisible, onAlertDismiss, error } = this.props;
    if (error === undefined) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          <AuthorizedMessage />
        </Alert>
      );
    }

    if (error) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          <ErrorMessage />
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
            label="First Name"
            placeholder="John"
            type="text"
            name="fname"
            component={renderInputField}
          />
          <Field
            label="Last Name"
            placeholder="Doe"
            type="text"
            name="lname"
            component={renderInputField}
          />
          <Field
            label="Email Address"
            placeholder="john.doe@example.com"
            type="text"
            name="email"
            component={renderInputField}
          />
          {!this.props.user && (
            <Fragment>
              <Field
                label="Password"
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
                label="Retype Password"
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

export default reduxForm({ form: 'user', validate })(UserForm);
