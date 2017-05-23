import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLocation, updateBusiness } from '../../actions/LocationActions';

import { BusinessProfileForm } from '../../components';
import { Loading } from '../../helpers';

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
    const { currentUser, fetchLocation } = this.props;

    if (currentUser.location) {
      fetchLocation(currentUser.location.objectId).then(() => this.setState({ fetched: true }));
    } else {
      this.setState({ fetched: true });
    }
  }

  render() {
    const { item, errorMessage, updateBusiness } = this.props;
    const { fetched } = this.state;

    return (
      <Loading className="container" loaded={fetched}>
        <BusinessProfileForm item={item} errorMessage={errorMessage} onSave={location => updateBusiness(item.objectId, location)} />
      </Loading>
    );
  }
}

export default connect(({
  auth: { currentUser },
  locations: { item, errorMessage }
}) => ({ currentUser, item, errorMessage }), { fetchLocation, updateBusiness })(LocationAddPage);
