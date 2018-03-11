import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
// import Pagination from 'react-js-pagination';
import {
  Row,
  Col,
  Card,
  Table,
  CardBody,
  CardHeader,
  ButtonGroup
} from 'reactstrap';
import ShowOrder from './ShowOrder';
import { LoadingContent, ErrorMessage, AuthorizedMessage } from '../../common';
import { fetchBalances } from '../../../actions/client';

export class ViewBalances extends Component {
  state = {
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 450,
    pageRangeDisplayed: 5
  };

  componentDidMount() {
    document.title = 'Sigorta | View My Balances';
    this.props.fetchBalances();
  }

  onChangePage = activePage => {
    this.setState({ activePage });
  };

  renderBalancesBody = () =>
    this.props.balances.map((item, index) => {
      const { balance, transaction, order, createdAt } = item;
      return (
        <Fragment key={index}>
          <tr>
            <td className="text-center" width="5%">
              {index + 1}
            </td>
            <td className="text-center">
              <strong>
                <NumberFormat
                  decimalScale={2}
                  value={balance}
                  displayType={'text'}
                  thousandSeparator
                  suffix={'TR'}
                />
              </strong>
            </td>
            <td className="text-center text-capitalize">{transaction}</td>
            <td className="text-center">
              <Moment format="DD-MM-YYYY">{createdAt}</Moment>
            </td>
            <td className="text-center">
              <ButtonGroup size="sm">
                {order ? <ShowOrder orderID={order} /> : 'N/A'}
              </ButtonGroup>
            </td>
          </tr>
        </Fragment>
      );
    });

  renderBalances = () => {
    const { balances, loading, errors } = this.props;
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
    if (balances.length === 0) {
      return (
        <div className="text-center">
          <h2>No Balances Found</h2>
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
              <th className="text-center">My Balance</th>
              <th className="text-center">My Transaction</th>
              <th className="text-center">Created</th>
              <th className="text-center">My Order</th>
            </tr>
          </thead>
          <tbody>{this.renderBalancesBody()}</tbody>
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
      <Row className="animated fadeIn">
        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <Row>
                <Col lg={{ size: 4, offset: 8 }}>
                  {/* <Input type="text" bsSize="sm" placeholder="Search" /> */}
                </Col>
              </Row>
            </CardHeader>
            <CardBody>{this.renderBalances()}</CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ balanceStore: { balances, loading, errors } }) => ({
  balances,
  loading,
  errors
});

export default connect(mapStateToProps, { fetchBalances })(ViewBalances);
