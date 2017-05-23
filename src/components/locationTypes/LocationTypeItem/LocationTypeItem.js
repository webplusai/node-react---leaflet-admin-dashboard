import React, { PropTypes } from 'react';

import { renderDateTime } from '../../../utils';

function LocationTypeItem({
  item: {
    objectId, name, price_per_invite_sent, price_per_invite_accepted, price_per_attendee, price_per_ticket_sold, createdAt
  }
}) {
  return (
    <div>
      <h1>LocationType #{objectId}</h1>
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Price per invite sent</td>
          <td>{price_per_invite_sent}</td>
        </tr>
        <tr>
          <td>Price per invite accepted</td>
          <td>{price_per_invite_accepted}</td>
        </tr>
        <tr>
          <td>Price per attendee</td>
          <td>{price_per_attendee}</td>
        </tr>
        <tr>
          <td>Price per ticket sold</td>
          <td>{price_per_ticket_sold}</td>
        </tr>
        <tr>
          <td>Created</td>
          <td>{renderDateTime(createdAt)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

LocationTypeItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default LocationTypeItem;