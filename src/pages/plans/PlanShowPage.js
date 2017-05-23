import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPlan } from '../../actions/PlanActions';

import { PlanItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class PlanShowPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchPlan: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchPlan } = this.props;
    fetchPlan(itemID, {}).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="plans" itemID={itemID} />
        <PlanItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ plans: { item } }) => ({ item }), { fetchPlan })(PlanShowPage);
