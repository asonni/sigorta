import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Alert, Button, CardBody, CardFooter } from 'reactstrap';

import validate from './validate';
import { Aux, InputField, DropdownListField } from '../../Common';

class ClientForm extends Component {
  componentWillReceiveProps(nextProps) {
    // Load Contact Asynchronously
    const { client } = nextProps;
    if (client && client._id !== this.props.client._id) {
      // Initialize form only once
      this.props.initialize({
        _id: client._id,
        name: client.name,
        discount: client.discount,
        user: client.user ? client.user._id : null
      });
    }
  }

  renderAlerts = () => {
    const { alertVisible, onAlertDismiss, clientError, userError } = this.props;
    if (clientError === undefined) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          Unauthorized
        </Alert>
      );
    }
    if (clientError) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {clientError}
        </Alert>
      );
    }
    if (userError === undefined) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          Unauthorized
        </Alert>
      );
    }
    if (userError) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {userError}
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
      renderUsers,
      itemComponent
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} loading={loading}>
        <CardBody>
          {this.renderAlerts()}
          <Field
            label="Clinet Name"
            placeholder="type any clinet name"
            type="text"
            name="name"
            component={InputField}
          />
          <Field
            label="Discount"
            placeholder="type any discount number"
            type="text"
            name="discount"
            component={InputField}
          />
          <Field
            label="User Info"
            name="user"
            placeholder="select any user info"
            options={renderUsers}
            itemComponent={itemComponent}
            component={DropdownListField}
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
            onClick={() => this.props.history.push('/admin/clients/view')}
          >
            <i className="fa fa-ban" /> Cancel
          </Button>
        </CardFooter>
      </Form>
    );
  }
}

export default reduxForm({ form: 'clinet', validate })(ClientForm);
