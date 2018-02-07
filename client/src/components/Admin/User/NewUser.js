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
import { Aux, InputField } from '../../Common';
import { newUser } from '../../../actions/admin/User';

class NewUser extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | New User';
  }

  onSubmintNewUser = async values => {
    try {
      await this.props.newUser(values);
      this.props.history.push('/admin/users/view');
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(this.props.errors);
    }
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    const { handleSubmit, loading, errors, pristine, submitting } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-user-plus" aria-hidden="true" /> New User
              </CardHeader>
              <Form
                onSubmit={handleSubmit(this.onSubmintNewUser)}
                loading={loading}
              >
                <CardBody>
                  {errors && (
                    <Alert
                      color="danger"
                      isOpen={this.state.alertVisible}
                      toggle={this.onAlertDismiss}
                    >
                      {errors}
                    </Alert>
                  )}
                  <Field
                    label="First Name"
                    placeholder="John"
                    type="text"
                    name="fname"
                    component={InputField}
                  />
                  <Field
                    label="Last Name"
                    placeholder="Doe"
                    type="text"
                    name="lname"
                    component={InputField}
                  />
                  <Field
                    label="Email Address"
                    placeholder="john.doe@example.com"
                    type="text"
                    name="email"
                    component={InputField}
                  />
                  <Field
                    label="Password"
                    placeholder="password"
                    type="password"
                    name="password"
                    component={InputField}
                  />
                  <Field
                    label="Retype Password"
                    placeholder="retype password"
                    type="password"
                    name="confirmPassword"
                    component={InputField}
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
                    onClick={() => this.props.history.push('/admin/users/view')}
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

const mapStateToProps = ({ userStore }) => {
  const { loading, errors } = userStore;
  return { loading, errors };
};

const NewUserForm = reduxForm({ form: 'newUser', validate })(NewUser);

export default connect(mapStateToProps, { newUser })(NewUserForm);
