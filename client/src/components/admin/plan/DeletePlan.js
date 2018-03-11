import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import NumberFormat from 'react-number-format';
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import { deletePlan } from '../../../actions/admin';

class DeletePlan extends Component {
  state = { alertVisible: false };

  onAlertDismiss = () => {
    this.setState({ alertVisible: false });
  };

  onCloseDeleteModal = () => {
    this.props.onCloseDeleteModal();
    this.onAlertDismiss();
  };

  onSubmitDeletePlan = async () => {
    await this.props.deletePlan(this.props.plan._id);
    if (
      this.props.deleteErrors.status === 400 ||
      this.props.deleteErrors.status === 401
    ) {
      this.setState({ alertVisible: true });
    } else {
      this.onCloseDeleteModal();
    }
  };

  render() {
    const {
      submitting,
      handleSubmit,
      showDeleteModal,
      plan: { name, price }
    } = this.props;
    return (
      <Modal isOpen={showDeleteModal} toggle={this.onCloseDeleteModal}>
        <ModalHeader toggle={this.onCloseDeleteModal}>
          Delete Plan Warning!
        </ModalHeader>
        <ModalBody className="text-center">
          <Alert
            color="danger"
            isOpen={
              this.state.alertVisible &&
              this.props.deletePlanError &&
              this.props.deletePlanError.status === 400
            }
            toggle={this.onAlertDismiss}
          >
            <h6 className="text-center">
              <i className="fa fa-clock-o" aria-hidden="true" />&nbsp; Something
              went wrong please try again later
            </h6>
          </Alert>
          <h5>Are you sure you want to delete this plan information?</h5>
          <br />
          <p>
            <strong>Name:</strong> {name}, <strong>Price:</strong>{' '}
            <NumberFormat
              decimalScale={2}
              value={price}
              displayType={'text'}
              thousandSeparator
              suffix={'TR'}
            />
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
              <Fragment>
                <i className="fa fa-circle-o-notch fa-spin" />&nbsp;Deleteing
              </Fragment>
            ) : (
              <Fragment>
                <i className="fa fa-trash" aria-hidden="true" />&nbsp;Yes
              </Fragment>
            )}
          </Button>{' '}
          <Button color="secondary" onClick={this.onCloseDeleteModal}>
            <i className="fa fa-times-circle" aria-hidden="true" />&nbsp;
            {submitting ? 'Cancel' : 'No'}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ planStore: { deleteErrors } }) => ({ deleteErrors });

const DeletePlanModal = reduxForm({ form: 'deletePlan' })(DeletePlan);

export default connect(mapStateToProps, { deletePlan })(DeletePlanModal);
