import React, { Component, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Alert, Button, CardBody, CardFooter } from 'reactstrap';

import validate from './validate';
import { renderInputField } from '../../common';

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
            label="Name (الاسم)"
            placeholder="Type any plan name"
            type="text"
            name="name"
            component={renderInputField}
          />
          <Field
            label="Price (السعر)"
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

export default reduxForm({ form: 'planForm', validate })(PlanForm);
