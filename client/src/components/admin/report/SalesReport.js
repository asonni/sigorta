import React, { Component, Fragment } from 'react';
import { Form } from 'semantic-ui-react';
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

  componentDidMount() {
    document.title = 'Sigorta | Sales Report';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sales !== this.props.sales) {
      printSalesTable(nextProps.sales);
    }
  }

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  renderAlerts = () => {
    if (this.props.errors.status === 401) {
      return (
        <Alert
          color="danger"
          isOpen={this.state.alertVisible}
          toggle={this.onAlertDismiss}
        >
          <AuthorizedMessage />
        </Alert>
      );
    }

    if (this.props.errors.status === 400) {
      return (
        <Alert
          color="danger"
          isOpen={this.state.alertVisible}
          toggle={this.onAlertDismiss}
        >
          <ErrorMessage />
        </Alert>
      );
    }
  };

  onSubmintFetchSales = async values => {
    this.setState({ alertVisible: false });
    await this.props.fetchSales(values);
    if (this.props.errors.status === 400 || this.props.errors.status === 401) {
      this.setState({ alertVisible: true });
    } else {
      this.onAlertDismiss();
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
                  <i className="fa fa-print" aria-hidden="true" />Sales Report
                  (تقرير المبيعات)
                </CardHeader>
                <CardBody>
                  {this.renderAlerts()}
                  <Field
                    label="Report Type (نوع التقرير)"
                    name="dateType"
                    placeholder="Select any report type"
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
                        dropUp={false}
                        label="Date From (التاريخ من)"
                        name="from"
                        showTime={false}
                        placeholder="Select any date from"
                        component={renderDateTimePickerField}
                      />
                    </Col>
                    <Col xs="12" md="6">
                      <Field
                        dropUp={false}
                        label="To (الي)"
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
                  <Button
                    size="sm"
                    color="secondary"
                    type="button"
                    onClick={this.props.reset}
                  >
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

const mapStateToProps = ({ salesStore: { sales, loading, errors } }) => ({
  sales,
  loading,
  errors
});

const SalesReportForm = reduxForm({ validate, form: 'salesReportForm' })(
  SalesReport
);

export default connect(mapStateToProps, { fetchSales })(SalesReportForm);
