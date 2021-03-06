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
  Button,
  CardBody,
  CardHeader,
  ButtonGroup
} from 'reactstrap';
import ShowOrder from './ShowOrder';
import DeleteBalance from './DeleteBalance';
import { LoadingContent, ErrorMessage, AuthorizedMessage } from '../../common';
import { fetchBalances } from '../../../actions/admin';

export class ViewBalances extends Component {
  state = {
    balance: {},
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 450,
    pageRangeDisplayed: 5,
    showDeleteModal: false
  };

  componentDidMount() {
    document.title = 'Sigorta | View Balances';
    this.props.fetchBalances();
  }

  onOpenDeleteModal = balance => {
    this.setState({ balance, showDeleteModal: true });
  };

  onCloseDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  onChangePage = activePage => {
    this.setState({ activePage });
  };

  renderBalancesBody = () =>
    this.props.balances.map((item, index) => {
      const { _id, client, balance, transaction, order, createdAt } = item;
      return (
        <Fragment key={index}>
          <tr>
            <td className="text-center" width="5%">
              {index + 1}
            </td>
            <td className="text-center">{client ? client.name : 'N/A'}</td>
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
                {order && <ShowOrder orderID={order} />}
                <Button
                  color="danger"
                  onClick={() =>
                    this.onOpenDeleteModal({ _id, balance, transaction })
                  }
                >
                  <i className="fa fa-trash" aria-hidden="true" />
                  <span className="hidden-xs-down">&nbsp;Delete</span>
                </Button>
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
          <p>Add some new balances to get started.</p>
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
              <th className="text-center">Client Name</th>
              <th className="text-center">Balance</th>
              <th className="text-center">Transaction</th>
              <th className="text-center">Created</th>
              <th className="text-center">Actions</th>
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
    const { balance, showDeleteModal } = this.state;
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
                        this.props.history.push('/admin/balances/new')
                      }
                    >
                      <i className="fa fa-plus" aria-hidden="true" /> New
                      Balance
                    </Button>
                  </Col>
                  <Col lg={{ size: 4, offset: 6 }}>
                    {/* <Input type="text" bsSize="sm" placeholder="Search" /> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>{this.renderBalances()}</CardBody>
            </Card>
          </Col>
        </Row>
        <DeleteBalance
          balance={balance}
          showDeleteModal={showDeleteModal}
          onCloseDeleteModal={this.onCloseDeleteModal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ balanceStore: { balances, loading, errors } }) => ({
  balances,
  loading,
  errors
});

export default connect(mapStateToProps, { fetchBalances })(ViewBalances);
