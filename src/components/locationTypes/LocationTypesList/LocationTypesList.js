import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDate } from '../../../utils';

function LocationTypesList({ items }) {
  return (
    <table className="table table-bordered table-hover table-striped table-responsive">
      <thead>
      <tr>
        <th>Name</th>
        <th>Price per invite sent</th>
        <th>Price per invite accepted</th>
        <th>Price per attendee</th>
        <th>Price per ticket sold</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, name, price_per_invite_sent, price_per_invite_accepted, price_per_attendee, price_per_ticket_sold, createdAt }) => (
        <tr key={objectId}>
          <td>{name}</td>
          <td>{price_per_invite_sent}</td>
          <td>{price_per_invite_accepted}</td>
          <td>{price_per_attendee}</td>
          <td>{price_per_ticket_sold}</td>
          <td>{renderDate(createdAt)}</td>
          <td>
            <LinkTo className="btn btn-info" url={`locationTypes/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`locationTypes/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`locationTypes/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

LocationTypesList.propTypes = {
  items: PropTypes.array.isRequired
};

export default LocationTypesList;