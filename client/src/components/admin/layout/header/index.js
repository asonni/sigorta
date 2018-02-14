import React, { Component } from 'react';
import { Nav, NavbarBrand, NavbarToggler, Button } from 'reactstrap';
import HeaderNotificationsDropdown from './HeaderNotificationsDropdown';

class Header extends Component {
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
          <HeaderNotificationsDropdown />
          <Button
            type="button"
            color="danger"
            style={{ marginRight: '10px', marginLeft: '10px' }}
            onClick={() => this.props.history.push('/logout')}
          >
            <i className="fa fa-lock fa-lg" />
          </Button>
        </Nav>
      </header>
    );
  }
}

export default Header;
