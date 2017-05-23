import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLocation, updateLocation } from '../../actions/LocationActions';

import { LocationForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class LocationAddPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchLocation: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchLocation } = this.props;
    fetchLocation(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item, errorMessage, updateLocation } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="locations" itemID={itemID} />
        <LocationForm item={item} errorMessage={errorMessage} onSave={location => updateLocation(itemID, location, item)} />
      </Loading>
    );
  }
}

export default connect(({ locations: { item, errorMessage } }) => ({ item, errorMessage }), { updateLocation, fetchLocation })(LocationAddPage);