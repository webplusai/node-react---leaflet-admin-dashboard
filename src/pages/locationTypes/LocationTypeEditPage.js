import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLocationType, updateLocationType } from '../../actions/LocationTypeActions';

import { LocationTypeForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class LocationTypeAddPage extends Component {

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
    const { params: { itemID }, item, errorMessage, updateLocationType } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="locationTypes" itemID={itemID} />
        <LocationTypeForm item={item} errorMessage={errorMessage} onSave={locationType => updateLocationType(itemID, locationType, item)} />
      </Loading>
    );
  }
}

export default connect(({ locationTypes: { item, errorMessage } }) => ({ item, errorMessage }), { updateLocationType, fetchLocationType })(LocationTypeAddPage);