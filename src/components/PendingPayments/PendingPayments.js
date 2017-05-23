import size from 'lodash/size';
import React, { Component, PropTypes } from 'react';

import { LinkTo } from '../../helpers';
import { renderDate, renderDateTime } from '../../utils';

export default class PendingPayments extends Component {

  static propTypes = {
    boosts: PropTypes.array.isRequired,
    location_type: PropTypes.object.isRequired,
  };

  renderResults({ boost_type, boost: { invites_accepted, invites_sent } }) {
    switch (boost_type.value) {
      case 'invites_accepted':
        return `Invites Accepted: ${invites_accepted}`;

      case 'invites_sent':
        return `Invites Sent: ${invites_sent}`
    }
  }

  renderCost({ boost_type, boost: { invites_accepted, invites_sent } }) {
    const { location_type } = this.props;

    switch (boost_type.value) {
      case 'invites_accepted':
        return `Price Per Invite Accepted: ${location_type.price_per_invite_accepted}`;

      case 'invites_sent':
        return `Price per Invite Sent: ${location_type.price_per_invite_sent}`
    }
  }

  renderTotal({ boost_type, total_spend, boost: { invites_accepted, invites_sent } }) {
    const { location_type } = this.props;
    switch (boost_type.value) {
      case 'invites_accepted':
        return `$${location_type.price_per_invite_accepted * invites_accepted - total_spend}`;

      case 'invites_sent':
        return `$${location_type.price_per_invite_sent * invites_sent - total_spend}`;
    }
  }

  render() {
    const { boosts, location_type } = this.props;

    if (size(boosts) > 0) {
      return (
        <table className="table table-bordered table-hover table-striped table-responsive">
          <thead>
          <tr>
            <th>Boost</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Max Budget</th>
            <th>Boost Type</th>
            <th>Created</th>
            <th>Location Type</th>

            <th>Results</th>
            <th>Cost</th>

            <th>Total</th>
            <th>Total Spend</th>
          </tr>
          </thead>
          <tbody>
          {boosts.map(({ objectId, name, start_time, end_time, with_max_budget, max_budget, boost_type, createdAt, total_spend, ...rest }) => (
            <tr key={objectId}>
              <td>
                <LinkTo url={`boosts/${objectId}`}>{name}</LinkTo>
              </td>

              <td>{renderDateTime(start_time)}</td>
              <td>{with_max_budget ? null : renderDateTime(end_time)}</td>
              <td>{with_max_budget ? max_budget : null}</td>
              <td>{boost_type ? boost_type.name : null}</td>
              <td>{renderDate(createdAt)}</td>

              <td>{location_type ? location_type.name : null}</td>

              <td>{this.renderResults({ boost_type, boost: rest })}</td>
              <td>{this.renderCost({ boost_type, boost: rest })}</td>
              <td>{this.renderTotal({ boost_type, total_spend, boost: rest })}</td>
              <td>{with_max_budget ? `$${total_spend} of $${max_budget}` : `$${total_spend}`}</td>
            </tr>
          ))}
          </tbody>
        </table>
      );
    }

    return (
      <h2>No Items</h2>
    );
  }
}
