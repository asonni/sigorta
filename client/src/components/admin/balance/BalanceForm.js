import React, { Component, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Alert, Button, CardBody, CardFooter } from 'reactstrap';

import validate from './validate';
import {
  ErrorMessage,
  renderInputField,
  AuthorizedMessage,
  renderDropdownField
} from '../../common';

class BalanceForm extends Component {
  // componentWillReceiveProps(nextProps) {
  //   // Load Contact Asynchronously
  //   const { balance } = nextProps;
  //   // console.log(this.props.balance);
  //   if (balance && balance._id !== this.props.balance._id) {
  //     // Initialize form only once
  //     this.props.initialize({
  //       _id: balance._id,
  //       balance: balance.balance
  //     });
  //   }
  // }

  renderAlerts = () => {
    const {
      alertVisible,
      onAlertDismiss,
      balanceError,
      clientsError
    } = this.props;
    if (balanceError === undefined || clientsError === undefined) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          <AuthorizedMessage />
        </Alert>
      );
    }

    if (balanceError || clientsError) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          <ErrorMessage />
        </Alert>
      );
    }
  };

  render() {
    const {
      handleSubmit,
      loading,
      pristine,
      submitting,
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
