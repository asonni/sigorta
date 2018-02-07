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
import { Aux, InputField, TimeoutMessage } from '../../Common';
import { fetchUser, editUser } from '../../../actions/admin/User';

class EditUser extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | Edit User';
    const { id } = this.props.match.params;
    this.props.fetchUser(id);
  }

  componentWillReceiveProps(nextProps) {
    // Load Contact Asynchronously
    const { user } = nextProps;
    if (user._id !== this.props.user._id) {
      // Initialize form only once
      this.props.initialize(user);
    }
  }

  onSubmintEditUser = async values => {
    try {
      await this.props.editUser(values);
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
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit
                User
              </CardHeader>
              <Form
                onSubmit={handleSubmit(this.onSubmintEditUser)}
                loading={loading}
              >
                <CardBody>
                  {errors && (
                    <Alert
                      color="danger"
                      isOpen={this.state.alertVisible}
                      toggle={this.onAlertDismiss}
                    >
                      <TimeoutMessage />
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
  const { user, loading, errors } = userStore;
  return { user, loading, errors };
};

const EditUserForm = reduxForm({ form: 'editUser', validate })(EditUser);

export default connect(mapStateToProps, { fetchUser, editUser })(EditUserForm);
