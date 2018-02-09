import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  Alert
} from 'reactstrap';

import { InputField } from '../Common';
import { loginUser } from '../../actions/admin/auth';

class Login extends Component {
  state = {
    alertVisible: false,
    loginLoading: false
  };

  componentWillMount() {
    document.title = 'Sigorta | Login';
  }

  onSubmintLogin = values => {
    this.setState({ loginLoading: true, alertVisible: false });
    const { loginUser, history, location: { search } } = this.props;
    loginUser(values, callback => {
      if (callback) {
        if (search) {
          const params = new URLSearchParams(search);
          history.push(params.get('next'));
        } else {
          history.push('/admin/dashboard');
        }
      } else {
        this.setState({ loginLoading: false, alertVisible: true });
      }
    });
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    const { handleSubmit, message } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <Card className="p-4">
                <Form onSubmit={handleSubmit(this.onSubmintLogin)}>
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    {message && (
                      <Alert
                        color="danger"
                        isOpen={this.state.alertVisible}
                        toggle={this.onAlertDismiss}
                      >
                        {message}
                      </Alert>
                    )}
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <i className="icon-user" />
                      </InputGroupAddon>
                      <Field
                        placeholder="Username"
                        type="text"
                        name="email"
                        component={InputField}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon>
                        <i className="icon-lock" />
                      </InputGroupAddon>
                      <Field
                        placeholder="Password"
                        type="password"
                        name="password"
                        component={InputField}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          type="submit"
                          color="primary"
                          className="px-4"
                          disabled={this.state.loginLoading}
                        >
                          {this.state.loginLoading ? (
                            <i className="fa fa-circle-o-notch fa-spin fa-lg" />
                          ) : (
                            'Login'
                          )}
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ authStore: { message } }) => {
  return { message };
};

const LgoinForm = reduxForm({ form: 'login' })(Login);

export default connect(mapStateToProps, { loginUser })(LgoinForm);
