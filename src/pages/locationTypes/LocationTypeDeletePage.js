import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteLocationType } from '../../actions/LocationTypeActions';

import { LocationTypeDelete } from '../../components';
import { Tabs } from '../../helpers';

class LocationTypeDeletePage extends Component {
  render() {
    const { params: { itemID }, deleteLocationType } = this.props;
    return (
      <div className="container">
        <Tabs modelsName="locationTypes" itemID={itemID} />
        <LocationTypeDelete itemID={itemID} onDelete={id => deleteLocationType(id)} />
      </div>
    );
  }
}

export default connect(null, { deleteLocationType })(LocationTypeDeletePage);