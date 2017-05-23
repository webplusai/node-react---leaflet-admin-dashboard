import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deletePlan } from '../../actions/PlanActions';

import { PlanDelete } from '../../components';
import { Tabs } from '../../helpers';

class PlanDeletePage extends Component {
  render() {
    const { params: { itemID }, deletePlan } = this.props;
    return (
      <div className="container">
        <Tabs modelsName="plans" itemID={itemID} />
        <PlanDelete itemID={itemID} onDelete={id => deletePlan(id)} />
      </div>
    );
  }
}

export default connect(null, { deletePlan })(PlanDeletePage);