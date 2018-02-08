import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
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
import { Aux, InputField, SelectField } from '../../Common';
import { newClinet } from '../../../actions/admin/client';
import { fetchUsers } from '../../../actions/admin/user';

class NewClinet extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | New Clinet';
    this.props.fetchUsers();
  }

  onSubmintNewClient = async values => {
    try {
      await this.props.newClinet(values);
      this.props.history.push('/admin/clients/view');
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(this.props.clientErrors);
    }
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    const {
      handleSubmit,
      users,
      userErrors,
      userLoading,
      clientErrors,
      pristine,
      submitting
    } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-user-plus" aria-hidden="true" /> New Clinet
              </CardHeader>
              <Form
                onSubmit={handleSubmit(this.onSubmintNewClient)}
                loading={userLoading}
              >
                <CardBody>
                  {clientErrors && (
                    <Alert
                      color="danger"
                      isOpen={this.state.alertVisible}
                      toggle={this.onAlertDismiss}
                    >
                      {clientErrors}
                    </Alert>
                  )}
                  {userErrors && (
                    <Alert
                      color="danger"
                      isOpen={this.state.alertVisible}
                      toggle={this.onAlertDismiss}
                    >
                      {userErrors}
                    </Alert>
                  )}
                  <Field
                    label="Clinet Name"
                    placeholder="type any clinet name"
                    type="text"
                    name="name"
                    component={InputField}
                  />
                  <Field
                    label="Discount"
                    placeholder="type any discount"
                    type="text"
                    name="discount"
                    component={InputField}
                  />
                  <Field
                    label="User Name"
                    name="user"
                    items={users}
                    component={SelectField}
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
                        <i className="fa fa-circle-o-notch fa-spin" />{' '}
                        Submitting
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
                    onClick={() =>
                      this.props.history.push('/admin/clients/view')
                    }
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

const mapStateToProps = ({ clientStore, userStore }) => {
  return {
    clientLoading: clientStore.loading,
    clientErrors: clientStore.errors,
    users: userStore.users,
    userLoading: userStore.loading,
    userErrors: userStore.errors
  };
};

const NewClinetForm = reduxForm({ form: 'newUser', validate })(NewClinet);

export default connect(mapStateToProps, { newClinet, fetchUsers })(
  NewClinetForm
);
