import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteLocation } from '../../actions/LocationActions';

import { LocationDelete } from '../../components';
import { Tabs } from '../../helpers';

class LocationDeletePage extends Component {
  render() {
    const { params: { itemID }, deleteLocation } = this.props;
    return (
      <div className="container">
        <Tabs modelsName="locations" itemID={itemID} />
        <LocationDelete itemID={itemID} onDelete={id => deleteLocation(id)} />
      </div>
    );
  }
}

export default connect(null, { deleteLocation })(LocationDeletePage);