import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
// import Pagination from 'react-js-pagination';
import NumberFormat from 'react-number-format';
import {
  Row,
  Col,
  Card,
  Badge,
  Table,
  Button,
  CardBody,
  CardHeader,
  ButtonGroup
} from 'reactstrap';
import DeleteClient from './DeleteClient';
import { LoadingContent, ErrorMessage, AuthorizedMessage } from '../../common';
import { fetchClients } from '../../../actions/admin';

class ViewClients extends Component {
  state = {
    client: {},
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 450,
    pageRangeDisplayed: 5,
    showDeleteModal: false
  };

  componentDidMount() {
    document.title = 'Sigorta | View Clients';
    this.props.fetchClients();
  }

  onOpenDeleteModal = client => {
    this.setState({ client, showDeleteModal: true });
  };

  onCloseDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  onChangePage = activePage => {
    this.setState({ activePage });
  };

  renderClientsBody = () =>
    this.props.clients.map((client, index) => {
      const {
        _id,
        user: { fname, lname, email },
        name,
        discount,
        balance,
        limit,
        createdAt
      } = client;
      return (
        <tr key={index}>
          <td className="text-center" width="5%">
            {index + 1}
          </td>
          <td>
            <div>{name}</div>
            <div className="small text-muted">
              Created: <Moment format="MMMM DD, YYYY">{createdAt}</Moment>
            </div>
          </td>
          <td className="text-center">{`${discount}%`}</td>
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
          <td className="text-center">
            <h5>
              {limit ? (
                <Badge color="success">ON</Badge>
              ) : (
                <Badge color="secondary">OFF</Badge>
              )}
            </h5>
          </td>
          <td>{`${fname} ${lname}`}</td>
          <td>{email}</td>
          <td className="text-center">
            <ButtonGroup size="sm">
              <Button
                color="info"
                onClick={() =>
                  this.props.history.push(`/admin/clients/edit/${_id}`)
                }
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                <span className="hidden-xs-down">&nbsp;Edit</span>
              </Button>
              <Button
                color="danger"
                onClick={() =>
                  this.onOpenDeleteModal({
                    _id,
                    name,
                    discount,
                    balance,
                    username: `${fname} ${lname}`,
                    email
                  })
                }
              >
                <i className="fa fa-trash" aria-hidden="true" />
                <span className="hidden-xs-down">&nbsp;Delete</span>
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

  renderClients = () => {
    const { clients, loading, errors } = this.props;
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
    if (clients.length === 0) {
      return (
        <div className="text-center">
          <h2>No Clients Found</h2>
          <p>Add some new clients to get started.</p>
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
              <th className="text-center" width="15%">
                Discount
              </th>
              <th className="text-center">Balance</th>
              <th className="text-center">Limit by Balance</th>
              <th>User Name</th>
              <th>User Email</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderClientsBody()}</tbody>
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
    const { client, showDeleteModal } = this.state;
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
                        this.props.history.push('/admin/clients/new')
                      }
                    >
                      <i className="fa fa-plus" aria-hidden="true" /> New Clinet
                    </Button>
                  </Col>
                  <Col lg={{ size: 4, offset: 6 }}>
                    {/* <Input type="text" bsSize="sm" placeholder="Search" /> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>{this.renderClients()}</CardBody>
            </Card>
          </Col>
        </Row>
        <DeleteClient
          client={client}
          showDeleteModal={showDeleteModal}
          onCloseDeleteModal={this.onCloseDeleteModal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ clientStore: { clients, loading, errors } }) => ({
  clients,
  loading,
  errors
});

export default connect(mapStateToProps, { fetchClients })(ViewClients);
