import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUser, updateUser } from '../../actions/UserActions';

import { UserForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class UserAddPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchUser } = this.props;
    fetchUser(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item, errorMessage, updateUser } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="users" itemID={itemID} />
        <UserForm item={item} errorMessage={errorMessage} onSave={user => updateUser(itemID, user, item)} />
      </Loading>
    );
  }
}

export default connect(({ users: { item, errorMessage } }) => ({ item, errorMessage }), { updateUser, fetchUser })(UserAddPage);