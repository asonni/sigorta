import React, { Component } from 'react';
import { connect } from 'react-redux';

const requireAuthClient = WeappedComponent => {
  class AuthenticationClient extends Component {
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
      } else if (isAdmin && authenticated) {
        history.push('/admin');
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
      } else if (isAdmin && authenticated) {
        history.push('/admin');
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

  return connect(mapStateToProps)(AuthenticationClient);
};

export { requireAuthClient };
