import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
// import Pagination from 'react-js-pagination';
import NumberFormat from 'react-number-format';
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Badge,
  Table,
  Button,
  CardBody,
  CardHeader,
  ButtonGroup
} from 'reactstrap';
import ApproveOrder from './ApproveOrder';
import DeleteOrder from './DeleteOrder';
import printOrderTable from './printOrderTable';
import { LoadingContent, ErrorMessage, AuthorizedMessage } from '../../common';
import { fetchOrders } from '../../../actions/admin';

export class ViewOrders extends Component {
  state = {
    order: {},
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 450,
    pageRangeDisplayed: 5,
    filterByApproved: true,
    filterByPending: true,
    showDeleteModal: false,
    showApproveModal: false
  };

  componentDidMount() {
    document.title = 'Sigorta | View Orders';
    this.props.fetchOrders();
  }

  onOpenDeleteModal = order => {
    this.setState({ order, showDeleteModal: true });
  };

  onCloseDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  onOpenApproveModal = order => {
    this.setState({ order, showApproveModal: true });
  };

  onCloseApproveModal = () => {
    this.setState({ showApproveModal: false });
  };

  onChangePage = activePage => {
    this.setState({ activePage });
  };

  renderOrdersBody = () =>
    this.props.orders
      .filter(
        ({ status }) =>
          (status.toLowerCase() === 'approved' &&
            this.state.filterByApproved) ||
          (status.toLowerCase() === 'pending' && this.state.filterByPending)
      )
      .map((order, index) => {
        const {
          _id,
          dob,
          name,
          plan,
          phone,
          price,
          client,
          gender,
          status,
          address,
          passport,
          createdAt,
          totalPrice,
          fatherName,
          motherName,
          nationality,
          numberOfYears,
          fatherPassport,
          motherPassport,
          totalPriceAfterDiscount
        } = order;
        return (
          <tr key={index}>
            <td className="text-center" width="2%">
              {index + 1}
            </td>
            <td>
              Client Name:{' '}
              <span className="text-capitalize">
                {client ? client.name : 'N/A'}
              </span>
              <div className="small text-muted">
                <strong>Balance:</strong>{' '}
                {client ? (
                  <NumberFormat
                    suffix={'TR'}
                    decimalScale={2}
                    thousandSeparator
                    displayType={'text'}
                    value={client.balance}
                  />
                ) : (
                  'N/A'
                )}
                <br />
                <strong>Discount:</strong>{' '}
                {client ? `${client.discount}%` : 'N/A'}
              </div>
              Plan Name:{' '}
              <span className="text-capitalize">{plan ? plan.name : null}</span>
              <div className="small text-muted">
                <span>
                  <strong>Price:</strong>{' '}
                  {plan ? (
                    <NumberFormat
                      decimalScale={2}
                      value={plan.price}
                      displayType={'text'}
                      thousandSeparator
                      suffix={'TR'}
                    />
                  ) : (
                    'N/A'
                  )}
                </span>
              </div>
            </td>
            <td>
              <div className="text-capitalize">{name}</div>
              <div className="small text-muted">
                <strong>Gender:</strong>{' '}
                <span className="text-capitalize">{gender}</span>
                <br />
                <strong>Nationality:</strong>{' '}
                <span className="text-capitalize">{nationality}</span>
                <br />
                <strong>Passport:</strong>{' '}
                <span className="text-uppercase">{passport}</span>
                <br />
                <strong>Date of Birth:</strong>{' '}
                <Moment format="MMMM DD, YYYY">{dob}</Moment>
              </div>
            </td>
            <td className="small text-muted">
              <strong>Father Name:</strong>{' '}
              <span className="text-capitalize">
                {fatherName ? fatherName : 'N/A'}
              </span>
              <br />
              <strong>Father Passport:</strong>{' '}
              <span className="text-uppercase">
                {fatherPassport ? fatherPassport : 'N/A'}
              </span>
              <br />
              <strong>Mother Name:</strong>{' '}
              <span className="text-capitalize">
                {motherName ? motherName : 'N/A'}
              </span>
              <br />
              <strong>Mother Passport:</strong>{' '}
              <span className="text-uppercase">
                {motherPassport ? motherPassport : 'N/A'}
              </span>
            </td>
            <td className="small text-capitalize text-muted">
              <strong>Phone:</strong> {phone}
              <br />
              <strong>Address:</strong> {address}
            </td>
            <td className="small text-muted">
              <strong>Price:</strong>{' '}
              <NumberFormat
                decimalScale={2}
                value={price}
                displayType={'text'}
                thousandSeparator
                suffix={'TR'}
              />
              <br />
              <strong>Total Price:</strong>{' '}
              <NumberFormat
                decimalScale={2}
                value={totalPrice}
                displayType={'text'}
                thousandSeparator
                suffix={'TR'}
              />
              <br />
              <strong>Total Price After Discount:</strong>{' '}
              <NumberFormat
                decimalScale={2}
                value={totalPriceAfterDiscount}
                displayType={'text'}
                thousandSeparator
                suffix={'TR'}
              />
              <br />
              <strong>Number of Years:</strong>{' '}
              <span>{numberOfYears === 1 ? 'One Year' : 'Two Years'}</span>
            </td>
            <td className="text-center" width="8%">
              <Moment format="DD-MM-YYYY">{createdAt}</Moment>
            </td>
            <td className="text-center">
              <h5>
                <Badge
                  pill
                  color={status === 'pending' ? 'warning' : 'success'}
                >
                  {status.toLowerCase() === 'pending' ? 'Pending' : 'Approved'}
                </Badge>
              </h5>
            </td>
            <td className="text-center">
              <ButtonGroup size="sm">
                {status.toLowerCase() === 'pending' && (
                  <Button
                    color="success"
                    onClick={() => this.onOpenApproveModal(order)}
                  >
                    <i className="fa fa-thumbs-up" aria-hidden="true" />
                    <span className="hidden-xs-down">&nbsp;Approve</span>
                  </Button>
                )}
                <Button
                  color="info"
                  onClick={() =>
                    this.props.history.push(`/admin/orders/edit/${_id}`)
                  }
                >
                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                  <span className="hidden-xs-down">&nbsp;Edit</span>
                </Button>
                <Button
                  color="danger"
                  onClick={() => this.onOpenDeleteModal(order)}
                >
                  <i className="fa fa-trash" aria-hidden="true" />
                  <span className="hidden-xs-down">&nbsp;Delete</span>
                </Button>
                <Button
                  color="secondary"
                  onClick={() => printOrderTable(order)}
                >
                  <i className="fa fa-print" aria-hidden="true" />
                  <span className="hidden-xs-down">&nbsp;Print</span>
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        );
      });

  renderOrders = () => {
    const { orders, loading, errors } = this.props;
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
    if (orders.length === 0) {
      return (
        <div className="text-center">
          <h2>No Orders Found</h2>
          <p>Add some new orders to get started.</p>
        </div>
      );
    }
    return this.renderOrdersBody().length > 0 ? (
      <Fragment>
        <Table responsive hover>
          <thead className="thead-light">
            <tr>
              <th className="text-center" width="2%">
                #
              </th>
              <th>Client/Plan Info</th>
              <th>Full Name</th>
              <th>Parents Info</th>
              <th>Contact Info</th>
              <th>Price Info</th>
              <th className="text-center" width="5%">
                Created
              </th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderOrdersBody()}</tbody>
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
    ) : (
      <div className="text-center">
        <h2>No Orders Result Found :(</h2>
      </div>
    );
  };

  render() {
    const { order, showDeleteModal, showApproveModal } = this.state;
    return (
      <Fragment>
        <Row className="animated fadeIn">
          <Col xs="12" lg="12">
            <Card>
              <CardHeader className="pb-1">
                <Row>
                  <Col xs="6" lg="1" className="pt-1">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() =>
                        this.props.history.push('/admin/orders/new')
                      }
                    >
                      <i className="fa fa-plus" aria-hidden="true" /> New Order
                    </Button>
                  </Col>
                  <Col
                    xs="6"
                    lg={{ size: 5, offset: 6 }}
                    className="pt-1 text-right"
                  >
                    {/* <Input type="text" bsSize="sm" placeholder="Search" /> */}
                    Filter By: <strong>Approved</strong>{' '}
                    <Label className="switch switch-text switch-pill switch-success">
                      <Input
                        type="checkbox"
                        className="switch-input"
                        checked={this.state.filterByApproved}
                        onChange={() =>
                          this.setState({
                            filterByApproved: !this.state.filterByApproved
                          })
                        }
                      />
                      <span
                        className="switch-label"
                        data-on="On"
                        data-off="Off"
                      />
                      <span className="switch-handle" />
                    </Label>
                    &nbsp;&nbsp; <strong>Pending</strong>{' '}
                    <Label className="switch switch-text switch-pill switch-warning">
                      <Input
                        type="checkbox"
                        className="switch-input"
                        checked={this.state.filterByPending}
                        onChange={() =>
                          this.setState({
                            filterByPending: !this.state.filterByPending
                          })
                        }
                      />
                      <span
                        className="switch-label"
                        data-on="On"
                        data-off="Off"
                      />
                      <span className="switch-handle" />
                    </Label>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>{this.renderOrders()}</CardBody>
            </Card>
          </Col>
        </Row>
        <DeleteOrder
          order={order}
          showDeleteModal={showDeleteModal}
          onCloseDeleteModal={this.onCloseDeleteModal}
        />
        <ApproveOrder
          order={order}
          showApproveModal={showApproveModal}
          onCloseApproveModal={this.onCloseApproveModal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ orderStore: { orders, loading, errors } }) => ({
  orders,
  loading,
  errors
});

export default connect(mapStateToProps, { fetchOrders })(ViewOrders);
