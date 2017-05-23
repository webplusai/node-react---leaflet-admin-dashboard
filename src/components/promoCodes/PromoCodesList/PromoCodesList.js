import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDate } from '../../../utils';

function PromoCodesList({ items }) {
  return (
    <table className="table table-bordered table-hover table-striped table-responsive">
      <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Location Types</th>
        <th>Created</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, name, amount, location_types, createdAt }) => (
        <tr key={objectId}>
          <td>{name}</td>
          <td>{amount}</td>
          <td>
            {(location_types || []).map((location_type, index) => (
              <span key={location_type.objectId}>
                <LinkTo url={`locationTypes/${location_type.objectId}`}>{location_type.name}</LinkTo>{location_types.length - 1 === index ? '' : ', '}
              </span>
            ))}
          </td>
          <td>{renderDate(createdAt)}</td>
          <td>
            <LinkTo className="btn btn-info" url={`promoCodes/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`promoCodes/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`promoCodes/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

PromoCodesList.propTypes = {
  items: PropTypes.array.isRequired
};

export default PromoCodesList;