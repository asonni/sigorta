import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';

import Dashboard from './Dashboard';
import UserList from './User/UserList';
import NewUser from './User/NewUser';
import EditUser from './User/EditUser';
import DeleteUser from './User/DeleteUser';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import Breadcrumb from './Layout/Breadcrumb';
import Aside from './Layout/Aside';
import Footer from './Layout/Footer';

class Admin extends Component {
  render() {
    return (
      <div className="app">
        <Header {...this.props} />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route exact path="/admin/dashboard" component={Dashboard} />
                <Route exact path="/admin/users/view" component={UserList} />
                <Route exact path="/admin/users/new" component={NewUser} />
                <Route
                  exact
                  path="/admin/users/edit/:id"
                  component={EditUser}
                />
                <ModalRoute
                  exact
                  path="/admin/users/delete/:id"
                  component={DeleteUser}
                />
                <Redirect exact from="/admin" to="/admin/dashboard" />
                <Redirect exact from="/admin/users" to="/admin/dashboard" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
        <ModalContainer />
      </div>
    );
  }
}
export default Admin;
