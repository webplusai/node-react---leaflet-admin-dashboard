import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteBoost } from '../../actions/BoostActions';

import { BoostDelete } from '../../components';
import { Tabs } from '../../helpers';

class BoostDeletePage extends Component {
  render() {
    const { params: { itemID }, deleteBoost } = this.props;
    return (
      <div className="container">
        <Tabs modelsName="boosts" itemID={itemID} />
        <BoostDelete itemID={itemID} onDelete={id => deleteBoost(id)} />
      </div>
    );
  }
}

export default connect(null, { deleteBoost })(BoostDeletePage);