import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import Dashboard from './Dashboard';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import Breadcrumb from '../Layout/Breadcrumb';
import Aside from '../Layout/Aside';
import Footer from '../Layout/Footer';

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
                <Route
                  path="/admin/dashboard"
                  name="Dashboard"
                  component={Dashboard}
                />
                <Redirect exact from="/admin" to="/admin/dashboard" />
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
