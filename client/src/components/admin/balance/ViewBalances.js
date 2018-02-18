import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Pagination from 'react-js-pagination';
import {
  Row,
  Col,
  Card,
  Input,
  Table,
  Button,
  CardBody,
  CardHeader,
  ButtonGroup
} from 'reactstrap';
import DeleteBalance from './DeleteBalance';
import { Aux, LoadingContent, ErrorMessage } from '../../common';
import { fetchBalances } from '../../../actions/admin';

class ViewBalances extends Component {
  state = {
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 450,
    pageRangeDisplayed: 5
  };

  componentWillMount() {
    document.title = 'Sigorta | View Balances';
    this.props.fetchBalances();
  }

  onChangePage = activePage => {
    this.setState({ activePage });
  };

  renderBalancesBody = () =>
    this.props.balances.map((item, index) => {
      const { _id, client, balance, transaction, createdAt } = item;
      console.log(item);
      return (
        <tr key={index}>
          <td className="text-center" width="5%">
            {index + 1}
          </td>
          <td className="text-center">{client ? client.name : 'N/A'}</td>
          <td className="text-center">{balance}</td>
          <td className="text-center text-capitalize">{transaction}</td>
          <td className="text-center">
            <Moment format="DD-MM-YYYY">{createdAt}</Moment>
          </td>
          <td className="text-center">
            <ButtonGroup size="sm">
              <Button
                color="info"
                onClick={() =>
                  this.props.history.push(`/admin/balances/edit/${client._id}`)
                }
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                <span className="hidden-xs-down">&nbsp;Edit</span>
              </Button>
              <DeleteBalance
                balanceId={_id}
                balance={balance}
                balanceTransaction={transaction}
              />
            </ButtonGroup>
          </td>
        </tr>
      );
    });

  renderBalances = () => {
    const { balances, loading, error } = this.props;
    const {
      activePage,
      itemsCountPerPage,
      totalItemsCount,
      pageRangeDisplayed
    } = this.state;
    if (loading) {
      return <LoadingContent />;
    }
    if (error) {
      return <ErrorMessage />;
    }
    // if (errors.authenticated === false) {
    //   return <AuthorizedMessage />;
    // }
    if (balances.length === 0) {
      return (
        <div className="text-center">
          <h2>No Balances Found</h2>
          <p>Add some new balances to get started.</p>
        </div>
      );
    }
    return (
      <Aux>
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
        <br />
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={this.onChangePage}
        />
      </Aux>
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
                        this.props.history.push('/admin/balances/new')
                      }
                    >
                      <i className="fa fa-plus" aria-hidden="true" /> New
                      Balance
                    </Button>
                  </Col>
                  <Col lg={{ size: 4, offset: 6 }}>
                    <Input type="text" bsSize="sm" placeholder="Search" />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>{this.renderBalances()}</CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ balanceStore: { balances, loading, error } }) => {
  return { balances, loading, error };
};

export default connect(mapStateToProps, { fetchBalances })(ViewBalances);
