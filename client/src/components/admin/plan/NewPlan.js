import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import PlanForm from './PlanForm';
import { newPlan } from '../../../actions/admin';

class NewPlan extends Component {
  state = { alertVisible: false };

  componentDidMount() {
    document.title = 'Sigorta | New Plan';
  }

  onSubmintNewPlan = async values => {
    await this.props.newPlan(values);
    if (this.props.errors.status === 400 || this.props.errors.status === 401) {
      this.setState({ alertVisible: true });
    } else {
      this.props.history.push('/admin/plans/view');
    }
  };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-plus" aria-hidden="true" />New Plan (خطة
                جديدة)
              </CardHeader>
              <PlanForm
                {...this.props}
                onSubmit={this.onSubmintNewPlan}
                onAlertDismiss={this.onAlertDismiss}
                alertVisible={this.state.alertVisible}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ planStore: { loading, errors } }) => ({
  loading,
  errors
});

export default connect(mapStateToProps, { newPlan })(NewPlan);
