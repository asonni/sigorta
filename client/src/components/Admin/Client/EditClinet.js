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
import { fetchClient, editClinet } from '../../../actions/admin/client';
import { fetchUsers } from '../../../actions/admin/user';

class EditClinet extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | Edit Clinet';
    const { id } = this.props.match.params;
    this.props.fetchClient(id);
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    // Load Contact Asynchronously
    const { client } = nextProps;
    if (client._id !== this.props.client._id) {
      // Initialize form only once
      this.props.initialize({
        _id: client._id,
        name: client.name,
        discount: client.discount,
        user: client.user ? client.user._id : null
      });
    }
  }

  onSubmintEditClient = async values => {
    try {
      await this.props.editClinet(values);
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
      clientLoading,
      clientErrors,
      users,
      userErrors,
      userLoading,
      pristine,
      submitting
    } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-user-plus" aria-hidden="true" /> Edit Clinet
              </CardHeader>
              <Form
                onSubmit={handleSubmit(this.onSubmintEditClient)}
                loading={clientLoading && userLoading}
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
    client: clientStore.client,
    clientLoading: clientStore.loading,
    clientErrors: clientStore.errors,
    users: userStore.users,
    userLoading: userStore.loading,
    userErrors: userStore.errors
  };
};

const EditClinetForm = reduxForm({
  form: 'editUser',
  validate
})(EditClinet);

export default connect(mapStateToProps, {
  fetchClient,
  editClinet,
  fetchUsers
})(EditClinetForm);
