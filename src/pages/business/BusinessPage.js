import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLocation } from '../../actions/LocationActions';

import { BusinessProfile } from '../../components';
import { Loading } from '../../helpers';

class BusinessPage extends Component {

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
    const { item } = this.props;
    const { fetched } = this.state;

    return (
      <Loading className="container" loaded={fetched}>
        <BusinessProfile item={item} />
      </Loading>
    );
  }
}

export default connect(({
  auth: { currentUser },
  locations: { item }
}) => ({ currentUser, item }), { fetchLocation })(BusinessPage);
