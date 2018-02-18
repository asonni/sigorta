import React, { Component } from 'react';
import { connect } from 'react-redux';

const requireGuest = WeappedComponent => {
  class Authentication extends Component {
    componentWillMount() {
      const { isAdmin, authenticated, history } = this.props;
      if (isAdmin && authenticated) {
        history.push('/admin');
      } else if (isAdmin === false && authenticated) {
        history.push('/client');
      }
    }

    componentWillUpdate(nextProps) {
      const { isAdmin, authenticated, history } = nextProps;
      if (isAdmin && authenticated) {
        history.push('/admin');
      } else if (isAdmin === false && authenticated) {
        history.push('/client');
      }
    }

    render() {
      return <WeappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ authStore: { isAdmin, authenticated } }) => {
    return { isAdmin, authenticated };
  };

  return connect(mapStateToProps)(Authentication);
};

export { requireGuest };
