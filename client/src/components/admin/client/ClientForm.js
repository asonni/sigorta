import React, { Component, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Alert, Button, CardBody, CardFooter } from 'reactstrap';

import validate from './validate';
import {
  ErrorMessage,
  renderInputField,
  AuthorizedMessage,
  renderDropdownField,
  renderCheckboxField
} from '../../common';

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
        limit: client.limit,
        user: client.user ? client.user._id : null
      });
    }
  }

  renderAlerts = () => {
    const {
      alertVisible,
      onAlertDismiss,
      clientError,
      usersError
    } = this.props;
    if ((clientError || usersError) === undefined) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          <AuthorizedMessage />
        </Alert>
      );
    }
    if (clientError || usersError) {
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
      renderUsers,
      itemComponent
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} loading={loading && !submitting}>
        <CardBody>
          {this.renderAlerts()}
          <Field
            label="Clinet Name"
            placeholder="Type any clinet name"
            type="text"
            name="name"
            component={renderInputField}
          />
          <Row>
            <Col xs="12" md="6">
              <Field
                label="Discount"
                placeholder="Type any discount number"
                type="text"
                name="discount"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6" className="text-center pt-30">
              <Field
                label="Limit by Balance"
                name="limit"
                component={renderCheckboxField}
                defaultChecked={!this.props.client}
              />
            </Col>
          </Row>
          <Field
            label="User Info"
            name="user"
            placeholder="Select any user info"
            options={renderUsers}
            itemComponent={itemComponent}
            component={renderDropdownField}
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
