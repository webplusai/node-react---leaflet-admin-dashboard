import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { validateToken, logoutUser } from '../../actions/AuthActions';

import { Header, Footer } from '../../components';

class MainLayout extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    fetched: false
  };

  componentWillMount() {
    const { validateToken } = this.props;
    validateToken().then(() => this.setState({ fetched: true }));
  }

  render() {
    const { isAuthenticated, currentUser, logoutUser } = this.props;
    const { fetched } = this.state;

    if (fetched) {
      return (
        <div>
          <Header
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            logoutUser={logoutUser}
          />
          {this.props.children}
          <Footer />
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({
  auth: {
    isAuthenticated,
    currentUser
  }
}) => ({ isAuthenticated, currentUser }), { validateToken, logoutUser })(MainLayout);