import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteUser } from '../../actions/UserActions';

import { UserDelete } from '../../components';
import { Tabs } from '../../helpers';

class UserDeletePage extends Component {
  render() {
    const { params: { itemID }, deleteUser } = this.props;
    return (
      <div className="container">
        <Tabs modelsName="users" itemID={itemID} />
        <UserDelete itemID={itemID} onDelete={id => deleteUser(id)} />
      </div>
    );
  }
}

export default connect(null, { deleteUser })(UserDeletePage);