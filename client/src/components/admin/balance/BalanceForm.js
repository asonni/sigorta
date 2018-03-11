import React, { Component, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Alert, Button, CardBody, CardFooter } from 'reactstrap';

import validate from './validate';
import { renderInputField, renderDropdownField } from '../../common';

class BalanceForm extends Component {
  renderAlerts = () => {
    const {
      alertVisible,
      onAlertDismiss,
      balanceErrors,
      clientsErrors
    } = this.props;
    if (
      (balanceErrors && balanceErrors.status === 401) ||
      (clientsErrors && clientsErrors.status === 401)
    ) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          You are not authorized to do this action
        </Alert>
      );
    }
    if (balanceErrors && balanceErrors.status === 400) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {balanceErrors.message}
        </Alert>
      );
    }
    if (clientsErrors && clientsErrors.status === 400) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          Something went wrong please try again later
        </Alert>
      );
    }
  };

  render() {
    const {
      loading,
      pristine,
      submitting,
      handleSubmit,
      renderClients,
      itemComponent
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} loading={loading && !submitting}>
        <CardBody>
          {this.renderAlerts()}
          <Field
            label="Clinet Info (معلومات الزبون)"
            name="client"
            placeholder="Select any client info"
            options={renderClients}
            itemComponent={itemComponent}
            component={renderDropdownField}
          />
          <Field
            label="Balance (الرصيد)"
            placeholder="Type any balance"
            type="text"
            name="balance"
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
            onClick={() => this.props.history.push('/admin/balances/view')}
          >
            <i className="fa fa-ban" /> Cancel
          </Button>
        </CardFooter>
      </Form>
    );
  }
}

export default reduxForm({ form: 'balanceFrom', validate })(BalanceForm);
