import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { deletePlan } from '../../../actions/admin';
import { Aux } from '../../common';

class DeletePlan extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onSubmitDeletePlan = async () => {
    try {
      await this.props.deletePlan(this.props.planId);
      this.toggle();
    } catch (err) {
      this.toggle();
      throw new SubmissionError(this.props.error);
    }
  };

  render() {
    const { planName, planPrice, handleSubmit, submitting } = this.props;
    return (
      <Aux>
        <Button color="danger" onClick={this.toggle}>
          <i className="fa fa-trash" aria-hidden="true" />
          <span className="hidden-xs-down">&nbsp;Delete</span>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete Plan Warning!</ModalHeader>
          <ModalBody className="text-center">
            <h5>Are you sure you want to delete this plan information?</h5>
            <br />
            <p>
              <strong>Name:</strong> {planName}, <strong>Price:</strong>{' '}
              {planPrice}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="danger"
              disabled={submitting}
              onClick={handleSubmit(this.onSubmitDeletePlan)}
            >
              {submitting ? (
                <Aux>
                  <i className="fa fa-circle-o-notch fa-spin" />&nbsp;Deleteing
                </Aux>
              ) : (
                <Aux>
                  <i className="fa fa-trash" aria-hidden="true" />&nbsp;Yes
                </Aux>
              )}
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              <i className="fa fa-times-circle" aria-hidden="true" />&nbsp;
              {submitting ? 'Cancel' : 'No'}
            </Button>
          </ModalFooter>
        </Modal>
      </Aux>
    );
  }
}

const mapStateToProps = ({ planStore: { loading, error } }) => {
  return { loading, error };
};

const DeletePlanModal = reduxForm({ form: 'deletePlan' })(DeletePlan);

export default connect(mapStateToProps, { deletePlan })(DeletePlanModal);
