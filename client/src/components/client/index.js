import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import Header from './layout/header';
import Sidebar from './layout/sidebar';
import Breadcrumb from './layout/Breadcrumb';

import ViewOrders from './order/ViewOrders';
import NewOrder from './order/NewOrder';

import ViewBalances from './balance/ViewBalances';

import Page404 from './Page404';
import Aside from './layout/Aside';
import Footer from './layout/Footer';

class Client extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Redirect exact from="/client" to="/client/orders/view" />
                <Redirect
                  exact
                  from="/client/balances"
                  to="/client/orders/view"
                />
                <Redirect exact from="/client/orders" to="/admin/orders/view" />
                <Route
                  exact
                  path="/client/orders/view"
                  component={ViewOrders}
                />
                <Route exact path="/client/orders/new" component={NewOrder} />
                <Route
                  exact
                  path="/client/balances/view"
                  component={ViewBalances}
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
export default Client;
