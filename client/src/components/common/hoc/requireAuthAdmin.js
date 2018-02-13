import React, { Component } from 'react';
import { connect } from 'react-redux';

const requireAuthAdmin = WeappedComponent => {
  class AuthenticationAdmin extends Component {
    componentWillMount() {
      const {
        isAdmin,
        authenticated,
        history,
        location: { pathname }
      } = this.props;
      if (!authenticated) {
        history.push({
          pathname: '/login',
          search: `?next=${pathname}`
        });
      } else if (isAdmin === false && authenticated) {
        history.push('/client');
      }
    }

    componentWillUpdate(nextProps) {
      const {
        isAdmin,
        authenticated,
        history,
        location: { pathname }
      } = nextProps;
      if (!authenticated) {
        history.push({
          pathname: '/login',
          search: `?next=${pathname}`
        });
      } else if (isAdmin === false && authenticated) {
        history.push('/client');
      }
    }

    render() {
      const { authenticated } = this.props;
      if (authenticated) {
        return <WeappedComponent {...this.props} />;
      }
      return null;
    }
  }

  const mapStateToProps = ({ authStore: { isAdmin, authenticated } }) => {
    return { isAdmin, authenticated };
  };

  return connect(mapStateToProps)(AuthenticationAdmin);
};

export { requireAuthAdmin };
