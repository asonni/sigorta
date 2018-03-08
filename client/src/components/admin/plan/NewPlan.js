import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import PlanForm from './PlanForm';
import { newPlan } from '../../../actions/admin';

class NewPlan extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | New Plan';
  }

  onSubmintNewPlan = async values => {
    try {
      await this.props.newPlan(values);
      this.props.history.push('/admin/plans/view');
    } catch (err) {
      this.setState({ alertVisible: true });
      throw new SubmissionError(this.props.error);
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
                <i className="fa fa-plus" aria-hidden="true" /> New Plan (خطة
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

const mapStateToProps = ({ planStore: { loading, error } }) => {
  return { loading, error };
};

export default connect(mapStateToProps, { newPlan })(NewPlan);
