import React, { PropTypes } from 'react';

import { renderDateTime } from '../../../utils';

function PaymentMethodItem({
  item: {
    objectId, number, exp_year, exp_month, createdAt
  }
}) {
  return (
    <div>
      <h1>PaymentMethod #{objectId}</h1>
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Number</td>
          <td>{number ? `Last 4 digits ${number}` : null}</td>
        </tr>
        <tr>
          <td>Year</td>
          <td>{exp_year}</td>
        </tr>
        <tr>
          <td>Month</td>
          <td>{exp_month}</td>
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

PaymentMethodItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default PaymentMethodItem;