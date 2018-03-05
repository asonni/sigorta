import React, { Component, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Alert, Button, CardBody, CardFooter } from 'reactstrap';

import validate from './validate';
import {
  ErrorMessage,
  renderInputField,
  AuthorizedMessage
} from '../../common';

class PlanForm extends Component {
  componentWillReceiveProps(nextProps) {
    // Load Contact Asynchronously
    const { plan } = nextProps;
    if (plan && plan._id !== this.props.plan._id) {
      // Initialize form only once
      this.props.initialize(plan);
    }
  }

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
            label="Name"
            placeholder="Type any plan name"
            type="text"
            name="name"
            component={renderInputField}
          />
          <Field
            label="Price"
            placeholder="Type any plan price"
            type="text"
            name="price"
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
            onClick={() => this.props.history.push('/admin/plans/view')}
          >
            <i className="fa fa-ban" /> Cancel
          </Button>
        </CardFooter>
      </Form>
    );
  }
}

export default reduxForm({ form: 'plan', validate })(PlanForm);
