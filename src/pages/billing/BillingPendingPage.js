import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Promise from 'bluebird';

import { fetchBoosts } from '../../actions/BoostActions';
import { fetchLocation } from '../../actions/LocationActions';

import { BillingTabs, PendingPayments } from '../../components';
import { Loading } from '../../helpers';

class PaymentMethodsIndexPage extends Component {

  static propTypes = {
    boosts: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    fetchBoosts: PropTypes.func.isRequired,
    fetchLocation: PropTypes.func.isRequired,
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { currentUser, fetchBoosts, fetchLocation } = this.props;
    this.setState({ fetched: false }, () => Promise.all([
      fetchBoosts({ include: '' }, currentUser),
      currentUser.location ? fetchLocation(currentUser.location.objectId) : null,
    ]).then(() => this.setState({ fetched: true })));
  }

  render() {
    const { boosts, location } = this.props;
    const { fetched } = this.state;

    return (
      <div className="container">
        <div className="row m-b">
          <BillingTabs active="billing/pending" />
        </div>
        <Loading loaded={fetched}>
          <div className="row">
            <h1>Pending Payments</h1>
            {location && location.location_type ? <PendingPayments boosts={boosts} location_type={location ? location.location_type : null} /> : <h1>Your location is not approved</h1>}
          </div>
        </Loading>
      </div>
    );
  }
}

export default connect(({
  auth: { currentUser },
  boosts: { items: boosts },
  locations: { item: location }
}) => ({ boosts, location, currentUser }), { fetchBoosts, fetchLocation })(PaymentMethodsIndexPage);
