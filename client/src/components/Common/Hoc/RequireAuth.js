import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RequireAuth = WeappedComponent => {
  class Authentication extends Component {
    PropTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return <WeappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return { authenticated: state.auth.authenticated };
  };

  return connect(mapStateToProps)(Authentication);
};

export { RequireAuth };
