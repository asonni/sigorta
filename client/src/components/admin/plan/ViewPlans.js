import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
// import Pagination from 'react-js-pagination';
import NumberFormat from 'react-number-format';
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  CardBody,
  CardHeader,
  ButtonGroup
} from 'reactstrap';
import { LoadingContent, ErrorMessage, AuthorizedMessage } from '../../common';
import { fetchPlans } from '../../../actions/admin';
import DeletePlan from './DeletePlan';

class ViewPlans extends Component {
  state = {
    plan: {},
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 450,
    pageRangeDisplayed: 5,
    showDeleteModal: false
  };

  componentDidMount() {
    document.title = 'Sigorta | View Plans';
    this.props.fetchPlans();
  }

  onOpenDeleteModal = plan => {
    this.setState({ plan, showDeleteModal: true });
  };

  onCloseDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  onChangePage = activePage => {
    this.setState({ activePage });
  };

  renderPlansBody = () =>
    this.props.plans.map((plan, index) => {
      const { _id, name, price, createdAt } = plan;
      return (
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td>
            <div>{name}</div>
            <div className="small text-muted">
              Created: <Moment format="MMMM DD, YYYY">{createdAt}</Moment>
            </div>
          </td>
          <td className="text-center">
            <strong>
              <NumberFormat
                decimalScale={2}
                value={price}
                displayType={'text'}
                thousandSeparator
                suffix={'TR'}
              />
            </strong>
          </td>
          <td className="text-center">
            <Moment format="DD-MM-YYYY">{createdAt}</Moment>
          </td>
          <td className="text-center">
            <ButtonGroup size="sm">
              <Button
                color="info"
                onClick={() =>
                  this.props.history.push(`/admin/plans/edit/${_id}`)
                }
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                <span className="hidden-xs-down">&nbsp;Edit</span>
              </Button>
              <Button
                color="danger"
                onClick={() => this.onOpenDeleteModal(plan)}
              >
                <i className="fa fa-trash" aria-hidden="true" />
                <span className="hidden-xs-down">&nbsp;Delete</span>
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

  renderPlans = () => {
    const { plans, loading, errors } = this.props;
    // const {
    //   activePage,
    //   itemsCountPerPage,
    //   totalItemsCount,
    //   pageRangeDisplayed
    // } = this.state;
    if (loading) {
      return <LoadingContent />;
    }
    if (errors.status === 400) {
      return <ErrorMessage />;
    }
    if (errors.status === 401) {
      return <AuthorizedMessage />;
    }
    if (plans.length === 0) {
      return (
        <div className="text-center">
          <h2>No Plans Found</h2>
          <p>Add some new plans to get started.</p>
        </div>
      );
    }
    return (
      <Fragment>
        <Table responsive hover>
          <thead className="thead-light">
            <tr>
              <th className="text-center" width="5%">
                #
              </th>
              <th>Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderPlansBody()}</tbody>
        </Table>
        {/* <br />
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={this.onChangePage}
        /> */}
      </Fragment>
    );
  };

  render() {
    const { plan, showDeleteModal } = this.state;
    return (
      <Fragment>
        <Row className="animated fadeIn">
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col lg="2" className="pt-1">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() =>
                        this.props.history.push('/admin/plans/new')
                      }
                    >
                      <i className="fa fa-plus" aria-hidden="true" /> New Plan
                    </Button>
                  </Col>
                  <Col lg={{ size: 4, offset: 6 }}>
                    {/* <Input type="text" bsSize="sm" placeholder="Search" /> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>{this.renderPlans()}</CardBody>
            </Card>
          </Col>
        </Row>
        <DeletePlan
          plan={plan}
          showDeleteModal={showDeleteModal}
          onCloseDeleteModal={this.onCloseDeleteModal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ planStore: { plans, loading, errors } }) => ({
  plans,
  loading,
  errors
});

export default connect(mapStateToProps, { fetchPlans })(ViewPlans);
