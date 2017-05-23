import first from 'lodash/first';
import last from 'lodash/last';
import compact from 'lodash/compact';
import isObject from 'lodash/isObject';
import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDate } from '../../../utils';

function UsersList({ items }) {
  return (
    <table className="table table-bordered table-hover table-striped table-responsive">
      <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Age</th>
        <th>Location</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, first_name, last_name, full_name, user_email, gender, age_count, location, createdAt }) => (
        <tr key={objectId}>
          <td>{first_name || (full_name ? first(full_name.split(' ')) : null)}</td>
          <td>{last_name || (full_name ? last(full_name.split(' ')) : null)}</td>
          <td>{user_email}</td>
          <td>{gender}</td>
          <td>{age_count}</td>
          <td>{location && isObject(location.ipLocation) ? compact([location.ipLocation.city, location.ipLocation.region, location.ipLocation.country]).join(', ') : null}</td>
          <td>{renderDate(createdAt)}</td>
          <td>
            <LinkTo className="btn btn-info" url={`users/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`users/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`users/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

UsersList.propTypes = {
  items: PropTypes.array.isRequired
};

export default UsersList;