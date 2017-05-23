import React, { PropTypes } from 'react';

import { LinkTo, BooleanField } from '../../../helpers';
import { renderDate } from '../../../utils';

function LocationsList({ items }) {
  return (
    <table className="table table-bordered table-hover table-striped table-responsive">
      <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Category</th>
        <th>Neighborhood</th>
        <th>City</th>
        <th>Takes Reservations</th>
        <th>Rating</th>
        <th>Good for Groups</th>
        <th>Outdoor Seating</th>
        <th>Location Type</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, name, address, phone, category, neighborhood, metro_city, reservations, rating, groups, outdoor, location_type, createdAt }) => (
        <tr key={objectId}>
          <td>{name}</td>
          <td>{address}</td>
          <td>{phone}</td>
          <td>{category}</td>
          <td>{neighborhood}</td>
          <td>{metro_city}</td>
          <td><BooleanField value={reservations} /></td>
          <td>{rating}</td>
          <td><BooleanField value={groups} /></td>
          <td><BooleanField value={outdoor} /></td>
          <td>
            {location_type ? <LinkTo url={`locationTypes/${location_type.objectId}`}>{location_type.name}</LinkTo> : null}
          </td>
          <td>{renderDate(createdAt)}</td>
          <td>
            <LinkTo className="btn btn-info" url={`locations/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`locations/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`locations/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

LocationsList.propTypes = {
  items: PropTypes.array.isRequired
};

export default LocationsList;