import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLocation } from '../../actions/LocationActions';

import { LocationItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class LocationShowPage extends Component {

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
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="locations" itemID={itemID} />
        <LocationItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ locations: { item } }) => ({ item }), { fetchLocation })(LocationShowPage);
