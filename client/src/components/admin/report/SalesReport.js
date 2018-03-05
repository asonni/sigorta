import React, { Component, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Row,
  Col,
  Card,
  Alert,
  Button,
  CardBody,
  CardHeader,
  CardFooter
} from 'reactstrap';

import validate from './validate';
import printSalesTable from './printSalesTable';
import { fetchSales } from '../../../actions/admin';
import {
  ErrorMessage,
  AuthorizedMessage,
  renderDropdownField,
  renderDateTimePickerField
} from '../../common';

export class SalesReport extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | Sales Report';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sales !== this.props.sales) {
      printSalesTable(nextProps.sales);
    }
  }

  onSubmintFetchSales = async values => {
    const { fetchSales, error } = this.props;
    try {
      await fetchSales(values);
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(error);
    }
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  renderAlerts = () => {
    const { alertVisible, error } = this.state;
    if (error === undefined) {
      return (
        <Alert
          color="danger"
          isOpen={alertVisible}
          toggle={this.onAlertDismiss}
        >
          <AuthorizedMessage />
        </Alert>
      );
    }

    if (error) {
      return (
        <Alert
          color="danger"
          isOpen={alertVisible}
          toggle={this.onAlertDismiss}
        >
          <ErrorMessage />
        </Alert>
      );
    }
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <Form onSubmit={handleSubmit(this.onSubmintFetchSales)}>
                <CardHeader>
                  <i className="fa fa-print" aria-hidden="true" /> Sales Report
                </CardHeader>
                <CardBody>
                  {this.renderAlerts()}
                  <Field
                    label="Date Type"
                    name="dateType"
                    placeholder="Select any date type"
                    options={[
                      { value: 'day', label: 'Day' },
                      { value: 'month', label: 'Month' },
                      { value: 'year', label: 'Year' }
                    ]}
                    component={renderDropdownField}
                  />
                  <Row>
                    <Col xs="12" md="6">
                      <Field
                        dropUp
                        label="Date From"
                        name="from"
                        showTime={false}
                        placeholder="Select any date from"
                        component={renderDateTimePickerField}
                      />
                    </Col>
                    <Col xs="12" md="6">
                      <Field
                        dropUp
                        label="Date To"
                        name="to"
                        showTime={false}
                        placeholder="Select any date to"
                        component={renderDateTimePickerField}
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
                        <i className="fa fa-circle-o-notch fa-spin" /> Printing
                      </Fragment>
                    ) : (
                      <Fragment>
                        <i className="fa fa-print" /> Print
                      </Fragment>
                    )}
                  </Button>{' '}
                  <Button size="sm" color="secondary" type="reset">
                    <i className="fa fa-ban" /> Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ salesStore: { sales, loading, error } }) => {
  return { sales, loading, error };
};

const SalesReportForm = reduxForm({ validate, form: 'salesReport' })(
  SalesReport
);

export default connect(mapStateToProps, { fetchSales })(SalesReportForm);
