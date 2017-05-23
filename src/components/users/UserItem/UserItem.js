import compact from 'lodash/compact';
import isObject from 'lodash/isObject';
import React, { PropTypes } from 'react';

import { BooleanField } from '../../../helpers';
import { renderDateTime } from '../../../utils';

function UserItem({
  item: {
    objectId, first_name, last_name, full_name, user_email, gender, age_count, bio, birthday, education_history, phone, tags, location,
    verified, is_admin, createdAt
  }
}) {
  return (
    <div>
      <h1>User #{objectId}</h1>
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>First Name</td>
          <td>{first_name}</td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>{last_name}</td>
        </tr>
        <tr>
          <td>Full Name</td>
          <td>{full_name}</td>
        </tr>
        <tr>
          <td>Email Address</td>
          <td>{user_email}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{gender}</td>
        </tr>
        <tr>
          <td>Age</td>
          <td>{age_count}</td>
        </tr>
        <tr>
          <td>Bio</td>
          <td>{bio}</td>
        </tr>
        <tr>
          <td>Birthday</td>
          <td>{birthday}</td>
        </tr>
        <tr>
          <td>Education History</td>
          <td>{education_history}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{phone}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{location && isObject(location.ipLocation) ? compact([location.ipLocation.city, location.ipLocation.region, location.ipLocation.country]).join(', ') : null}</td>
        </tr>
        <tr>
          <td>Tags</td>
          <td>{(tags || []).join(', ')}</td>
        </tr>
        <tr>
          <td>Joined Date</td>
          <td>{renderDateTime(createdAt)}</td>
        </tr>
        <tr>
          <td>Verified?</td>
          <td><BooleanField value={verified} /></td>
        </tr>
        <tr>
          <td>Admin?</td>
          <td><BooleanField value={is_admin} /></td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

UserItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default UserItem;