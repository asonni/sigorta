import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span>
          <a href="http://sigorta.com">Sigorta</a> &copy; 2018 Insurance
        </span>
        <span className="ml-auto">
          Powered by <a href="http://sigorta.com">Sigorta</a>
        </span>
      </footer>
    );
  }
}

export default Footer;
