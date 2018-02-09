import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Alert, Button, CardBody, CardFooter } from 'reactstrap';

import validate from './validate';
import { Aux, InputField } from '../../Common';

class UserForm extends Component {
  componentWillReceiveProps(nextProps) {
    // Load Contact Asynchronously
    const { user } = nextProps;
    if (user && user._id !== this.props.user._id) {
      // Initialize form only once
      this.props.initialize(user);
    }
  }

  renderAlerts = () => {
    const { alertVisible, onAlertDismiss, error } = this.props;
    if (error === undefined) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          Unauthorized
        </Alert>
      );
    }
    if (error) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {error}
        </Alert>
      );
    }
  };

  render() {
    const { handleSubmit, loading, pristine, submitting } = this.props;
    return (
      <Form onSubmit={handleSubmit} loading={loading}>
        <CardBody>
          {this.renderAlerts()}
          <Field
            label="First Name"
            placeholder="John"
            type="text"
            name="fname"
            component={InputField}
          />
          <Field
            label="Last Name"
            placeholder="Doe"
            type="text"
            name="lname"
            component={InputField}
          />
          <Field
            label="Email Address"
            placeholder="john.doe@example.com"
            type="text"
            name="email"
            component={InputField}
          />
          {!this.props.user && (
            <Aux>
              <Field
                label="Password"
                placeholder="password"
                type="password"
                name="password"
                component={InputField}
              />
              <Field
                label="Retype Password"
                placeholder="retype password"
                type="password"
                name="confirmPassword"
                component={InputField}
              />
            </Aux>
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
              <Aux>
                <i className="fa fa-circle-o-notch fa-spin" /> Submitting
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
    );
  }
}

export default reduxForm({ form: 'user', validate })(UserForm);
