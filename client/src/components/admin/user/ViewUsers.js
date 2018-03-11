import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
// import Pagination from 'react-js-pagination';
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  CardBody,
  CardHeader,
  ButtonGroup
} from 'reactstrap';
import { LoadingContent, ErrorMessage, AuthorizedMessage } from '../../common';
import { fetchUsers } from '../../../actions/admin';
import DeleteUser from './DeleteUser';

class ViewUsers extends PureComponent {
  state = {
    user: {},
    activePage: 1,
    itemsCountPerPage: 10,
    totalItemsCount: 450,
    pageRangeDisplayed: 5,
    showDeleteModal: false
  };

  componentDidMount() {
    document.title = 'Sigorta | View Users';
    this.props.fetchUsers();
  }

  onOpenDeleteModal = user => {
    this.setState({ user, showDeleteModal: true });
  };

  onCloseDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

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
            <Moment format="DD-MM-YYYY">{createdAt}</Moment>
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
                color="secondary"
                onClick={() =>
                  this.props.history.push(`/admin/users/reset-password/${_id}`)
                }
              >
                <i className="fa fa-key" aria-hidden="true" />
                <span className="hidden-xs-down">&nbsp;Reset Password</span>
              </Button>
              <Button
                color="info"
                onClick={() =>
                  this.props.history.push(`/admin/users/edit/${_id}`)
                }
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                <span className="hidden-xs-down">&nbsp;Edit</span>
              </Button>
              <Button
                color="danger"
                onClick={() => this.onOpenDeleteModal(user)}
              >
                <i className="fa fa-trash" aria-hidden="true" />
                <span className="hidden-xs-down">&nbsp;Delete</span>
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

  renderUsers = () => {
    const { users, loading, errors } = this.props;
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
    if (users.length === 0) {
      return (
        <div className="text-center">
          <h2>No Users Found</h2>
          <p>Add some new users to get started.</p>
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
              <th>Email</th>
              <th className="text-center">Date Registered</th>
              <th className="text-center">Role</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderUsersBody()}</tbody>
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
    const { user, showDeleteModal } = this.state;
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
                        this.props.history.push('/admin/users/new')
                      }
                    >
                      <i className="fa fa-user-plus" aria-hidden="true" /> New
                      User
                    </Button>
                  </Col>
                  <Col lg={{ size: 4, offset: 6 }}>
                    {/* <Input type="text" bsSize="sm" placeholder="Search" /> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>{this.renderUsers()}</CardBody>
            </Card>
          </Col>
        </Row>
        <DeleteUser
          user={user}
          showDeleteModal={showDeleteModal}
          onCloseDeleteModal={this.onCloseDeleteModal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ userStore: { users, loading, errors } }) => ({
  users,
  loading,
  errors
});

export default connect(mapStateToProps, { fetchUsers })(ViewUsers);
