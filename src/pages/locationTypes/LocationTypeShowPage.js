import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLocationType } from '../../actions/LocationTypeActions';

import { LocationTypeItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class LocationTypeShowPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchLocationType: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchLocationType } = this.props;
    fetchLocationType(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="locationTypes" itemID={itemID} />
        <LocationTypeItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ locationTypes: { item } }) => ({ item }), { fetchLocationType })(LocationTypeShowPage);
