import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import DeleteClient from './DeleteClient';
import { LoadingContent, TimeoutMessage } from '../../Common';
import { fetchClients } from '../../../actions/admin/client';

class ViewClients extends Component {
  componentWillMount() {
    document.title = 'Sigorta | View Clients';
    this.props.fetchClients();
  }

  renderClientsBody = () =>
    this.props.clients.map((client, index) => {
      const {
        _id,
        user: { fname, lname, email, phone },
        name,
        discount
      } = client;
      return (
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td className="text-center">{name}</td>
          <td className="text-center">{`${discount}%`}</td>
          <td>{`${fname} ${lname}`}</td>
          <td>{email}</td>
          <td className="text-center">{phone || 'N/A'}</td>
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
              <DeleteClient
                clientId={_id}
                clientName={name}
                clinetUserEmail={email}
              />
            </ButtonGroup>
          </td>
        </tr>
      );
    });

  renderClients = () => {
    const { clients, loading, errors } = this.props;
    if (loading) {
      return <LoadingContent />;
    }
    if (errors) {
      return <TimeoutMessage />;
    }
    // if (errors.authenticated === false) {
    //   return <AuthorizedMessage />;
    // }
    if (clients.length === 0) {
      return (
        <div className="text-center">
          <h2>No Clients Found</h2>
          <p>Add some new clients to get started.</p>
        </div>
      );
    }
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Clinet Name</th>
            <th className="text-center">Discount</th>
            <th>User Full Name</th>
            <th>User Email</th>
            <th className="text-center">User Phone</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>{this.renderClientsBody()}</tbody>
      </Table>
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
                        this.props.history.push('/admin/clients/new')
                      }
                    >
                      <i className="fa fa-user-plus" aria-hidden="true" /> New
                      Clinet
                    </Button>
                  </Col>
                  <Col lg={{ size: 4, offset: 6 }}>
                    <Input type="text" bsSize="sm" placeholder="Search" />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {this.renderClients()}
                {/* <Pagination>
                  <PaginationItem disabled>
                    <PaginationLink previous href="#">
                      Prev
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next href="#">
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </Pagination> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ clientStore }) => {
  const { clients, loading, errors } = clientStore;
  return { clients, loading, errors };
};

export default connect(mapStateToProps, { fetchClients })(ViewClients);
