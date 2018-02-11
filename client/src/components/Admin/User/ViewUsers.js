import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Pagination from 'react-js-pagination';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  ButtonGroup,
  Button,
  Input
} from 'reactstrap';
import { Aux, LoadingContent, TimeoutMessage } from '../../common';
import { fetchUsers } from '../../../actions/admin';
import DeleteUser from './DeleteUser';

class ViewUsers extends Component {
  state = {
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 450,
    pageRangeDisplayed: 5
  };

  componentWillMount() {
    document.title = 'Sigorta | View Users';
    this.props.fetchUsers();
  }

  onChangePage = activePage => {
    this.setState({ activePage });
  };

  renderUsersBody = () =>
    this.props.users.map((user, index) => {
      const { _id, fname, lname, email, createdAt, isAdmin } = user;
      return (
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td>
            <div>{`${fname} ${lname}`}</div>
            <div className="small text-muted">
              <span>{isAdmin ? 'Admin' : 'Client'}</span> | Registered:{' '}
              <Moment format="MMMM DD, YYYY">{createdAt}</Moment>
            </div>
          </td>
          <td>{email}</td>
          <td className="text-center">
            <Moment format="DD/MM/YYYY">{createdAt}</Moment>
          </td>
          <td className="text-center">{isAdmin ? 'Admin' : 'Client'}</td>
          <td className="text-center">
            <span>
              <Badge color="success">Active</Badge>
            </span>
          </td>
          <td className="text-center">
            <ButtonGroup size="sm">
              <Button
                color="info"
                onClick={() =>
                  this.props.history.push(`/admin/users/edit/${_id}`)
                }
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                <span className="hidden-xs-down">&nbsp;Edit</span>
              </Button>
              <DeleteUser
                userId={_id}
                userFullName={`${fname} ${lname}`}
                userEmail={email}
              />
            </ButtonGroup>
          </td>
        </tr>
      );
    });

  renderUsers = () => {
    const { users, loading, error } = this.props;
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
      return <TimeoutMessage />;
    }
    // if (error.authenticated === false) {
    //   return <AuthorizedMessage />;
    // }
    if (users.length === 0) {
      return (
        <div className="text-center">
          <h2>No Users Found</h2>
          <p>Add some new users to get started.</p>
        </div>
      );
    }
    return (
      <Aux>
        <Table
          responsive
          hover
          className="table-outline mb-0 d-none d-sm-table"
        >
          <thead className="thead-light">
            <tr>
              <th className="text-center" width="5%">
                #
              </th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th className="text-center">Date Registered</th>
              <th className="text-center">Role</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderUsersBody()}</tbody>
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
                        this.props.history.push('/admin/users/new')
                      }
                    >
                      <i className="fa fa-user-plus" aria-hidden="true" /> New
                      User
                    </Button>
                  </Col>
                  <Col lg={{ size: 4, offset: 6 }}>
                    <Input type="text" bsSize="sm" placeholder="Search" />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>{this.renderUsers()}</CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ userStore: { users, loading, error } }) => {
  return { users, loading, error };
};

export default connect(mapStateToProps, { fetchUsers })(ViewUsers);
