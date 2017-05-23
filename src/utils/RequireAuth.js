import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired
    };

    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      const { isAuthenticated } = this.props;
      if (!isAuthenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      const { isAuthenticated } = nextProps;
      if (!isAuthenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      const { isAuthenticated } = this.props;
      if (isAuthenticated) {
        return <ComposedComponent {...this.props} />
      }

      return null;
    }
  }

  function mapStateToProps({ auth: { isAuthenticated } }) {
    return { isAuthenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
