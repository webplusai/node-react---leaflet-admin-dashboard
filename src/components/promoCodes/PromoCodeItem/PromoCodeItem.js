import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDateTime } from '../../../utils';

function PromoCodeItem({
  item: {
    objectId, name, amount, location_types, createdAt
  }
}) {
  return (
    <div>
      <h1>PromoCode #{objectId}</h1>
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
          <td>Amount</td>
          <td>{amount}</td>
        </tr>
        <tr>
          <td>Location Types</td>
          <td>
            {(location_types || []).map((location_type, index) => (
              <span key={location_type.objectId}>
                <LinkTo url={`locationTypes/${location_type.objectId}`}>{location_type.name}</LinkTo>{location_types.length - 1 === index ? '' : ', '}
              </span>
            ))}
          </td>
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

PromoCodeItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default PromoCodeItem;