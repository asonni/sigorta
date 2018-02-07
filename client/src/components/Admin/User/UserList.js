import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
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
import { LoadingContent, TimeoutMessage } from '../../Common';
import { fetchUsers } from '../../../actions/admin/User';
import DeleteUser from './DeleteUser';

class UserList extends Component {
  componentWillMount() {
    document.title = 'Sigorta | View Users';
    this.props.fetchUsers();
  }

  renderUsersBody = () =>
    this.props.users.map((user, index) => {
      const { _id, fname, lname, email, createdAt, isAdmin } = user;
      return (
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td>{`${fname} ${lname}`}</td>
          <td>{email}</td>
          <td className="text-center">
            <Moment format="YYYY/MM/DD">{createdAt}</Moment>
          </td>
          <td className="text-center">{isAdmin ? 'Admin' : 'Client'}</td>
          <td className="text-center">
            <h5>
              <Badge color="success">Active</Badge>
            </h5>
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
    const { users, loading, errors } = this.props;
    if (loading) {
      return <LoadingContent />;
    }
    if (errors) {
      return <TimeoutMessage />;
    }
    // if (errors.authenticated === false) {
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
      <Table responsive hover>
        <thead>
          <tr>
            <th className="text-center">#</th>
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
              <CardBody>
                {this.renderUsers()}
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

const mapStateToProps = ({ userStore }) => {
  const { users, loading, errors } = userStore;
  return { users, loading, errors };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
