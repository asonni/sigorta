import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import PlanForm from './PlanForm';
import { fetchPlan, editPlan } from '../../../actions/admin';

class EditPlan extends Component {
  state = { alertVisible: false };

  componentWillMount() {
    document.title = 'Sigorta | Edit Plan';
    const { id } = this.props.match.params;
    this.props.fetchPlan(id);
  }

  onSubmintEditPlan = async values => {
    try {
      await this.props.editPlan(values);
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
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit
                Plan
              </CardHeader>
              <PlanForm
                {...this.props}
                onSubmit={this.onSubmintEditPlan}
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

const mapStateToProps = ({ planStore: { plan, loading, error } }) => {
  return { plan, loading, error };
};

export default connect(mapStateToProps, { fetchPlan, editPlan })(EditPlan);
