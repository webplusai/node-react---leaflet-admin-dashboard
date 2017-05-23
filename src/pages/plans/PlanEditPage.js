import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPlan, updatePlan } from '../../actions/PlanActions';

import { PlanForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class PlanAddPage extends Component {

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
    const { params: { itemID }, item, errorMessage, updatePlan } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="plans" itemID={itemID} />
        <PlanForm item={item} errorMessage={errorMessage} onSave={plan => updatePlan(itemID, plan, item)} />
      </Loading>
    );
  }
}

export default connect(({ plans: { item, errorMessage } }) => ({ item, errorMessage }), { updatePlan, fetchPlan })(PlanAddPage);