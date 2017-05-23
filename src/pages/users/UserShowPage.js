import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/UserActions';

import { UserItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class UserShowPage extends Component {

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
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="users" itemID={itemID} />
        <UserItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ users: { item } }) => ({ item }), { fetchUser })(UserShowPage);
