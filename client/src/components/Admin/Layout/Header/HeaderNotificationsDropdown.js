import React, { Component } from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';

class HeaderNotificationsDropdown extends Component {
  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-bell fa-lg" />
          <Badge pill color="danger">
            5
          </Badge>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center">
            <strong>You have 5 notifications</strong>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-bell-o" /> Updates<Badge color="info">42</Badge>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-envelope-o" /> Messages<Badge color="success">
              42
            </Badge>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-tasks" /> Tasks<Badge color="danger">42</Badge>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-comments" /> Comments<Badge color="warning">
              42
            </Badge>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default HeaderNotificationsDropdown;
