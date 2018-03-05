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
  Badge,
  Table,
  Button,
  CardBody,
  CardHeader
} from 'reactstrap';
import { LoadingContent, ErrorMessage } from '../../common';
import { fetchOrders } from '../../../actions/client';

export class ViewOrders extends Component {
  state = {
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 450,
    pageRangeDisplayed: 5
  };

  componentWillMount() {
    document.title = 'Sigorta | View My Orders';
    this.props.fetchOrders();
  }

  onChangePage = activePage => {
    this.setState({ activePage });
  };

  renderOrdersBody = () =>
    this.props.orders.map((item, index) => {
      const {
        dob,
        name,
        plan,
        phone,
        price,
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
      } = item;
      return (
        <tr key={index}>
          <td className="text-center" width="2%">
            {index + 1}
          </td>
          <td>
            <span className="text-capitalize">{plan ? plan.name : null}</span>
            <div className="small text-muted">
              <span>
                <strong>Price:</strong>{' '}
                <NumberFormat
                  value={plan.price}
                  displayType={'text'}
                  thousandSeparator
                  suffix={'TLY'}
                />
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
              value={price}
              displayType={'text'}
              thousandSeparator
              suffix={'TLY'}
            />
            <br />
            <strong>Total Price:</strong>{' '}
            <NumberFormat
              value={totalPrice}
              displayType={'text'}
              thousandSeparator
              suffix={'TLY'}
            />
            <br />
            <strong>Total Price After Discount:</strong>{' '}
            <NumberFormat
              value={totalPriceAfterDiscount}
              displayType={'text'}
              thousandSeparator
              suffix={'TLY'}
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
              <Badge pill color={status === 'pending' ? 'warning' : 'success'}>
                {status.toLowerCase() === 'pending' ? 'Pending' : 'Approved'}
              </Badge>
            </h5>
          </td>
        </tr>
      );
    });

  renderOrders = () => {
    const { orders, loading, error } = this.props;
    // const {
    //   activePage,
    //   itemsCountPerPage,
    //   totalItemsCount,
    //   pageRangeDisplayed
    // } = this.state;
    if (loading) {
      return <LoadingContent />;
    }
    if (error) {
      return <ErrorMessage />;
    }
    // if (errors.authenticated === false) {
    //   return <AuthorizedMessage />;
    // }
    if (orders.length === 0) {
      return (
        <div className="text-center">
          <h2>No Orders Found</h2>
          <p>Add some new orders to get started.</p>
        </div>
      );
    }
    return (
      <Fragment>
        <Table responsive hover>
          <thead className="thead-light">
            <tr>
              <th className="text-center" width="2%">
                #
              </th>
              <th>Plan Info</th>
              <th>Full Name</th>
              <th>Parents Info</th>
              <th>Contact Info</th>
              <th>Price Info</th>
              <th className="text-center" width="5%">
                Created
              </th>
              <th className="text-center">Status</th>
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
    );
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col lg="2" className="pt-1">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() =>
                        this.props.history.push('/client/orders/new')
                      }
                    >
                      <i className="fa fa-plus" aria-hidden="true" /> New Order
                    </Button>
                  </Col>
                  <Col lg={{ size: 4, offset: 6 }}>
                    <Input type="text" bsSize="sm" placeholder="Search" />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>{this.renderOrders()}</CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ clientOrderStore: { orders, loading, error } }) => {
  return { orders, loading, error };
};

export default connect(mapStateToProps, { fetchOrders })(ViewOrders);