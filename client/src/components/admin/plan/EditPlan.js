import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader } from 'reactstrap';

import PlanForm from './PlanForm';
import { fetchPlan, editPlan } from '../../../actions/admin';

class EditPlan extends Component {
  state = { alertVisible: false };

  componentDidMount() {
    document.title = 'Sigorta | Edit Plan';
    const { id } = this.props.match.params;
    this.props.fetchPlan(id);
  }

  onSubmintEditPlan = async values => {
    await this.props.editPlan(values);
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
                <i className="fa fa-pencil-square-o" aria-hidden="true" />Edit
                Plan (تعديل الخطة)
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

const mapStateToProps = ({ planStore: { plan, loading, errors } }) => ({
  plan,
  loading,
  errors
});

export default connect(mapStateToProps, { fetchPlan, editPlan })(EditPlan);
