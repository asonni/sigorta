import React, { Component } from 'react';
import { Nav, NavbarBrand, NavbarToggler, Button } from 'reactstrap';
import ConfirmLogout from './ConfirmLogout';
// import HeaderNotificationsDropdown from './HeaderNotificationsDropdown';

class Header extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  sidebarToggle = () => {
    // e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  };

  sidebarMinimize = () => {
    // e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  };

  mobileSidebarToggle = () => {
    // e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  };

  asideToggle = () => {
    // e.preventDefault();
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

export default Header;
