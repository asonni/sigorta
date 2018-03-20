import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, NavbarBrand, NavbarToggler } from 'reactstrap';
import ConfirmLogout from './ConfirmLogout';
// import HeaderNotificationsDropdown from './HeaderNotificationsDropdown';

class Header extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  sidebarToggle = () => {
    document.body.classList.toggle('sidebar-hidden');
  };

  sidebarMinimize = () => {
    document.body.classList.toggle('sidebar-minimized');
  };

  mobileSidebarToggle = () => {
    document.body.classList.toggle('sidebar-mobile-show');
  };

  asideToggle = () => {
    document.body.classList.toggle('aside-menu-hidden');
  };

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarBrand href="#" />
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <Nav className="ml-auto" navbar>
          {/* <HeaderNotificationsDropdown /> */}
          <ConfirmLogout
            toggle={this.toggle}
            modal={this.state.modal}
            onAccept={() => this.props.history.push('/logout')}
          />
        </Nav>
      </header>
    );
  }
}

export default withRouter(Header);
