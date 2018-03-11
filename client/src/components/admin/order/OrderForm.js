import React, { Component, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import NumberFormat from 'react-number-format';
import { Row, Col, Alert, Button, CardBody, CardFooter } from 'reactstrap';

import validate from './validate';
import {
  renderInputField,
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
    if (
      (clientsError && clientsError.status === 401) ||
      (plansError && plansError.status === 401)
    ) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          You are not authorized to do this action
        </Alert>
      );
    }
    if (orderError && orderError.status === 400) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {orderError.message}
        </Alert>
      );
    }
    if (orderError && orderError.status === 401) {
      return (
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {orderError.message}
        </Alert>
      );
    }
  };

  render() {
    const {
      price,
      discount,
      totalPrice,
      numberOfYears,
      totalPriceAfterDiscount
    } = this.state;
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
            <h5>Order Price Details (تفاصيل سعر الطلب)</h5>
            <h6>
              <strong>Price</strong>:{' '}
              <NumberFormat
                decimalScale={2}
                value={price}
                displayType={'text'}
                thousandSeparator
                suffix={'TR'}
              />{' '}
              | <strong>Total Price</strong>:{' '}
              <NumberFormat
                decimalScale={2}
                value={totalPrice}
                displayType={'text'}
                thousandSeparator
                suffix={'TR'}
              />{' '}
              | <strong>Total Price After Discount</strong>:{' '}
              <NumberFormat
                decimalScale={2}
                value={totalPriceAfterDiscount}
                displayType={'text'}
                thousandSeparator
                suffix={'TR'}
              />
            </h6>
          </Alert>
          <Field
            label="Clinet Info (معلومات الزبون)"
            name="client"
            placeholder="Select any client info"
            options={renderClients}
            itemComponent={itemClientComponent}
            component={renderDropdownField}
            onChange={({ client: { discount } }) =>
              this.setState({
                discount,
                totalPriceAfterDiscount:
                  price * numberOfYears - price * numberOfYears * discount / 100
              })
            }
          />
          <Field
            label="Plan Info (معلومات الخطة)"
            name="plan"
            placeholder="Select any plan info"
            options={renderPlans}
            itemComponent={itemPlanComponent}
            component={renderDropdownField}
            onChange={({ plan: { price } }) =>
              this.setState({
                price,
                totalPrice: price * numberOfYears,
                totalPriceAfterDiscount:
                  price * numberOfYears - price * numberOfYears * discount / 100
              })
            }
          />
          <Row>
            <Col xs="12" md="6">
              <Field
                label="Full Name (الأسم كامل)"
                placeholder="Type any full name"
                type="text"
                name="name"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                dropUp
                label="Date of Birth (تاريخ الميلاد)"
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
                label="Gender (الجنس)"
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
                label="Nationality (الجنسية)"
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
                label="Passport (رقم الجواز)"
                placeholder="Type any passport number"
                type="text"
                name="passport"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                label="Phone (الهاتف)"
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
                label="Father Name (اسم الأب)"
                placeholder="Type any father name"
                type="text"
                name="fatherName"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                label="Father Passport (رقم جواز الأب)"
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
                label="Mother Name (اسم الأم)"
                placeholder="Type any mother name"
                type="text"
                name="motherName"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                label="Mother Passport (رقم جواز الأم)"
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
                label="Address (العنوان)"
                placeholder="Type any address"
                type="text"
                name="address"
                component={renderInputField}
              />
            </Col>
            <Col xs="12" md="6">
              <Field
                label="Number of Years (عدد السنوات)"
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
                    totalPrice: value * price,
                    totalPriceAfterDiscount:
                      price * value - price * value * discount / 100
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

export default reduxForm({ form: 'orderForm', validate })(OrderForm);
