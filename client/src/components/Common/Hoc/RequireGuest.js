import React, { Component } from 'react';
import { connect } from 'react-redux';

const RequireGuest = WeappedComponent => {
  class Authentication extends Component {
    componentWillMount() {
      const { authenticated, history } = this.props;
      if (authenticated) {
        history.push('/admin');
      }
    }

    componentWillUpdate(nextProps) {
      const { authenticated, history } = nextProps;
      if (authenticated) {
        history.push('/admin');
      }
    }

    render() {
      return <WeappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ authStore: { authenticated } }) => {
    return { authenticated };
  };

  return connect(mapStateToProps)(Authentication);
};

export { RequireGuest };
