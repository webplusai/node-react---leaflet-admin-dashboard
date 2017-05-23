import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchBoost, updateBoost } from '../../actions/BoostActions';

import { BoostForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class BoostAddPage extends Component {

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
    const { params: { itemID }, item, errorMessage, updateBoost } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="boosts" itemID={itemID} />
        <BoostForm item={item} errorMessage={errorMessage} onSave={boost => updateBoost(itemID, boost, item)} />
      </Loading>
    );
  }
}

export default connect(({ boosts: { item, errorMessage } }) => ({ item, errorMessage }), { updateBoost, fetchBoost })(BoostAddPage);