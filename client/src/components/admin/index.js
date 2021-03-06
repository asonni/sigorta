import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './layout/header';
import Sidebar from './layout/sidebar';
import Breadcrumb from './layout/Breadcrumb';
// import Dashboard from './dashboard';

import ViewUsers from './user/ViewUsers';
import NewUser from './user/NewUser';
import EditUser from './user/EditUser';
import ResetPassword from './user/ResetPassword';

import ViewClients from './client/ViewClients';
import NewClient from './client/NewClient';
import EditClient from './client/EditClient';

import ViewPlans from './plan/ViewPlans';
import NewPlan from './plan/NewPlan';
import EditPlan from './plan/EditPlan';

import ViewBalances from './balance/ViewBalances';
import NewBalance from './balance/NewBalance';

import ViewOrders from './order/ViewOrders';
import NewOrder from './order/NewOrder';
import EditOrder from './order/EditOrder';

import SalesReport from './report/SalesReport';

import Page404 from './Page404';
import Aside from './layout/Aside';
import Footer from './layout/Footer';

class Admin extends Component {
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
                <Redirect exact from="/admin" to="/admin/orders/view" />
                <Redirect exact from="/admin/users" to="/admin/orders/view" />
                <Redirect exact from="/admin/clients" to="/admin/orders/view" />
                <Redirect
                  exact
                  from="/admin/balances"
                  to="/admin/orders/view"
                />
                <Redirect exact from="/admin/plans" to="/admin/orders/view" />
                <Redirect exact from="/admin/orders" to="/admin/orders/view" />
                {/* <Route exact path="/admin/dashboard" component={Dashboard} /> */}
                <Route exact path="/admin/users/view" component={ViewUsers} />
                <Route exact path="/admin/users/new" component={NewUser} />
                <Route
                  exact
                  path="/admin/users/edit/:id"
                  component={EditUser}
                />
                <Route
                  exact
                  path="/admin/users/reset-password/:id"
                  component={ResetPassword}
                />
                <Route
                  exact
                  path="/admin/clients/view"
                  component={ViewClients}
                />
                <Route exact path="/admin/clients/new" component={NewClient} />
                <Route
                  exact
                  path="/admin/clients/edit/:id"
                  component={EditClient}
                />
                <Route exact path="/admin/plans/view" component={ViewPlans} />
                <Route exact path="/admin/plans/new" component={NewPlan} />
                <Route
                  exact
                  path="/admin/plans/edit/:id"
                  component={EditPlan}
                />
                <Route
                  exact
                  path="/admin/balances/view"
                  component={ViewBalances}
                />
                <Route
                  exact
                  path="/admin/balances/new"
                  component={NewBalance}
                />
                <Route exact path="/admin/orders/view" component={ViewOrders} />
                <Route exact path="/admin/orders/new" component={NewOrder} />
                <Route
                  exact
                  path="/admin/orders/edit/:id"
                  component={EditOrder}
                />
                <Route
                  exact
                  path="/admin/reports/sales"
                  component={SalesReport}
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
