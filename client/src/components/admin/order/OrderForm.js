import React, { Component, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import NumberFormat from 'react-number-format';
import { Row, Col, Alert, Button, CardBody, CardFooter } from 'reactstrap';

import validate from './validate';
import {
  ErrorMessage,
  renderInputField,
  AuthorizedMessage,
  renderNationalities,
  renderDropdownField,
  renderDateTimePickerField
} from '../../common';

class OrderForm extends Component {
  state = {
    price: 0,
    discount: 0,
    totalPrice: 0,
    numberOfYears: 0,
    totalPriceAfterDiscount: 0
  };
  componentWillReceiveProps(nextProps) {
    // Load Contact Asynchronously
    const { order } = nextProps;
    if (order && order._id !== this.props.order._id) {
      console.log(order);
      const {
        client,
        plan,
        price,
        totalPrice,
        totalPriceAfterDiscount,
        numberOfYears
      } = order;
      // Initialize form only once
      this.props.initialize({
        ...order,
        client: client && client._id,
        plan: plan && plan._id
      });
      this.setState({
        price,
        totalPrice,
        numberOfYears,
        totalPriceAfterDiscount
      });
    }
  }

  renderAlerts = () => {
    const {
      orderError,
      plansError,
      alertVisible,
      clientsError,
      onAlertDismiss
    } = this.props;
    if ((orderError || clientsError || plansError) === undefined) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          <AuthorizedMessage />
        </Alert>
      );
    }

    if (orderError || clientsError || plansError) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          <ErrorMessage />
        </Alert>
      );
    }
  };

  render() {
    const {
      loading,
      pristine,
      submitting,
      renderPlans,
      handleSubmit,
      renderClients,
      itemPlanComponent,
      itemClientComponent
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} loading={loading && !submitting}>
        <CardBody>
          {this.renderAlerts()}
          <Alert color="info text-center">
            <h5>Order Price Details</h5>
            <h6>
              <strong>Price</strong>:{' '}
              <NumberFormat
                value={this.state.price}
                displayType={'text'}
                thousandSeparator
                suffix={'TLY'}
              />{' '}
              | <strong>Total Price</strong>:{' '}
              <NumberFormat
                value={this.state.totalPrice}
                displayType={'text'}
                thousandSeparator
                suffix={'TLY'}
              />{' '}
              | <strong>Total Price After Discount</strong>:{' '}
              <NumberFormat
                value={this.state.totalPriceAfterDiscount}
                displayType={'text'}
                thousandSeparator
                suffix={'TLY'}
              />
            </h6>
          </Alert>
          <Field
            label="Clinet Info"
            name="client"
            placeholder="Select any client info"
            options={renderClients}
            itemComponent={itemClientComponent}
            component={renderDropdownField}
            onChange={({ client: { discount } }) =>
              this.setState({
                discount,
                totalPriceAfterDiscount:
                  this.state.price * this.state.numberOfYears -
                  this.state.price * this.state.numberOfYears * discount / 100
              })
            }
          />
          <Field
            label="Plan Info"
            name="plan"
            placeholder="Select any plan info"
            options={renderPlans}
            itemComponent={itemPlanComponent}
            component={renderDropdownField}
            onChange={({ plan: { price } }) =>
              this.setState({
                price,
                totalPrice: price * this.state.numberOfYears,
                totalPriceAfterDiscount:
                  this.state.price * this.state.numberOfYears -
                  this.state.price *
                    this.state.numberOfYears *
                    this.state.discount /
                    100
              })
            }
          />
          <Row>
            <Col xs="12" md="6">
              <Field
                label="Full Name"
                placeholder="Type any full name"
                type="text"
                name="name"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                dropUp
                label="Date of Birth"
                name="dob"
                showTime={false}
                placeholder="Select any date of birth"
                component={renderDateTimePickerField}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6">
              <Field
                label="Gender"
                name="gender"
                placeholder="Select any gender"
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' }
                ]}
                component={renderDropdownField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                label="Nationality"
                name="nationality"
                placeholder="Select any nationality"
                options={renderNationalities()}
                component={renderDropdownField}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6">
              <Field
                label="Passport"
                placeholder="Type any passport number"
                type="text"
                name="passport"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                label="Phone"
                placeholder="Type any phone number"
                type="text"
                name="phone"
                component={renderInputField}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6">
              <Field
                label="Father Name"
                placeholder="Type any father name"
                type="text"
                name="fatherName"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                label="Father Passport"
                placeholder="Type any father's passport number"
                type="text"
                name="fatherPassport"
                component={renderInputField}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6">
              <Field
                label="Mother Name"
                placeholder="Type any mother name"
                type="text"
                name="motherName"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                label="Mother Passport"
                placeholder="Type any mother's passport number"
                type="text"
                name="motherPassport"
                component={renderInputField}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6">
              <Field
                label="Address"
                placeholder="Type any address"
                type="text"
                name="address"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                label="Number of Years"
                name="numberOfYears"
                placeholder="Select any number of years"
                options={[
                  { value: 1, label: 'One Year' },
                  { value: 2, label: 'Two Years' }
                ]}
                component={renderDropdownField}
                onChange={({ value }) =>
                  this.setState({
                    numberOfYears: value,
                    totalPrice: value * this.state.price,
                    totalPriceAfterDiscount:
                      this.state.price * value -
                      this.state.price * value * this.state.discount / 100
                  })
                }
              />
            </Col>
          </Row>
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
            onClick={() => this.props.history.push('/admin/orders/view')}
          >
            <i className="fa fa-ban" /> Cancel
          </Button>
        </CardFooter>
      </Form>
    );
  }
}

export default reduxForm({ form: 'order', validate })(OrderForm);
