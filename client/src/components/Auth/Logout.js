import { Component } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/auth';

class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

export default connect(null, { logoutUser })(Logout);
