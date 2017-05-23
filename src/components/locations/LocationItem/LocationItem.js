import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { BooleanField, LinkTo } from '../../../helpers';
import { capitalize, renderDateTime, renderHours, weekDays } from '../../../utils';

function LocationItem({
  item: {
    objectId, name, address, phone, category, neighborhood, metro_city, hours, reservations, latitude, longitude, rating,
    groups, outdoor, location_type, verified, createdAt
  }
}) {
  return (
    <div>
      <h1>Location #{objectId}</h1>
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
          <td>Address</td>
          <td>{address}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{phone}</td>
        </tr>
        <tr>
          <td>Category</td>
          <td>{category}</td>
        </tr>
        <tr>
          <td>Neighborhood</td>
          <td>{neighborhood}</td>
        </tr>
        <tr>
          <td>City</td>
          <td>{metro_city}</td>
        </tr>
        <tr>
          <td>Hours</td>
          <td>
            {size(hours || []) > 0 ? (
                <table className="table table-bordered table-hover table-striped table-responsive">
                  <tbody>
                  {hours.map(({ day, start, end }, index) => (
                    <tr key={index}>
                      <td>{capitalize(weekDays[day])}</td>
                      <td>{renderHours(start)}</td>
                      <td>{renderHours(end)}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              ) : null}
          </td>
        </tr>
        <tr>
          <td>Takes Reservations</td>
          <td><BooleanField value={reservations} /></td>
        </tr>
        <tr>
          <td>Latitude</td>
          <td>{latitude}</td>
        </tr>
        <tr>
          <td>Longitude</td>
          <td>{longitude}</td>
        </tr>
        <tr>
          <td>Rating</td>
          <td>{rating}</td>
        </tr>
        <tr>
          <td>Good for Groups</td>
          <td><BooleanField value={groups} /></td>
        </tr>
        <tr>
          <td>Outdoor Seating</td>
          <td><BooleanField value={outdoor} /></td>
        </tr>
        <tr>
          <td>Location Type</td>
          <td>
            {location_type ? <LinkTo url={`locationTypes/${location_type.objectId}`}>{location_type.name}</LinkTo> : null}
          </td>
        </tr>
        <tr>
          <td>Verified?</td>
          <td><BooleanField value={verified} /></td>
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

LocationItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default LocationItem;