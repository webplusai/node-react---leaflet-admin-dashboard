import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchBoost } from '../../actions/BoostActions';
import { updateBoost } from '../../actions/BoostActions';

import { BoostItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class BoostShowPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchBoost: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchBoost } = this.props;
    fetchBoost(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item, item: { objectId, approved }, updateBoost } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="boosts" itemID={itemID} />
        <BoostItem item={item} toggleApproved={() => updateBoost(objectId, { approved: !approved })} />
      </Loading>
    );
  }
}

export default connect(({ boosts: { item } }) => ({ item }), { fetchBoost, updateBoost })(BoostShowPage);
