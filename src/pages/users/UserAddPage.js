import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../actions/UserActions';

import { UserForm } from '../../components';

class UserAddPage extends Component {

  static propTypes = {
    createUser: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, createUser } = this.props;
    return (
      <div className="container">
        <UserForm errorMessage={errorMessage} onSave={user => createUser(user)} />
      </div>
    );
  }
}

export default connect(({ users: { errorMessage } }) => ({ errorMessage }), { createUser })(UserAddPage);