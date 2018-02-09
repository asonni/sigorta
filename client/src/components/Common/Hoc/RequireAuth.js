import React, { Component } from 'react';
import { connect } from 'react-redux';

const RequireAuth = WeappedComponent => {
  class Authentication extends Component {
    componentWillMount() {
      const { authenticated, history, location: { pathname } } = this.props;
      if (!authenticated) {
        history.push({
          pathname: '/login',
          search: `?next=${pathname}`
        });
      }
    }

    componentWillUpdate(nextProps) {
      const { authenticated, history, location: { pathname } } = nextProps;
      if (!authenticated) {
        history.push({
          pathname: '/login',
          search: `?next=${pathname}`
        });
      }
    }

    render() {
      if (this.props.authenticated) {
        return <WeappedComponent {...this.props} />;
      }
      return null;
    }
  }

  const mapStateToProps = ({ authStore: { authenticated } }) => {
    return { authenticated };
  };

  return connect(mapStateToProps)(Authentication);
};

export { RequireAuth };
