import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import Breadcrumb from './Layout/Breadcrumb';
import Dashboard from './Dashboard';
import ViewUsers from './User/ViewUsers';
import NewUser from './User/NewUser';
import EditUser from './User/EditUser';
import ViewClients from './Client/ViewClients';
import NewClinet from './Client/NewClinet';
import EditClinet from './Client/EditClinet';
import Page404 from './Page404';
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
                <Redirect exact from="/admin" to="/admin/dashboard" />
                <Redirect exact from="/admin/users" to="/admin/dashboard" />
                <Redirect exact from="/admin/clients" to="/admin/dashboard" />
                <Route exact path="/admin/dashboard" component={Dashboard} />
                <Route exact path="/admin/users/view" component={ViewUsers} />
                <Route exact path="/admin/users/new" component={NewUser} />
                <Route
                  exact
                  path="/admin/users/edit/:id"
                  component={EditUser}
                />
                <Route
                  exact
                  path="/admin/clients/view"
                  component={ViewClients}
                />
                <Route exact path="/admin/clients/new" component={NewClinet} />
                <Route
                  exact
                  path="/admin/clients/edit/:id"
                  component={EditClinet}
                />
                <Route component={Page404} />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}
export default Admin;
