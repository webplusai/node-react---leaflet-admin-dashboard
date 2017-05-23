import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { renderDateTimeFromUnix } from '../../utils';

function PaymentsHistory({ items }) {

  if (size(items) > 0) {
    return (
      <table className="table table-bordered table-hover table-striped table-responsive">
        <thead>
        <tr>
          <th>Amount</th>
          <th>Description</th>
          <th>Last 4 digits</th>
          <th>Created</th>
        </tr>
        </thead>
        <tbody>
        {items.map(({objectId, amount, currency, description, source, created}, index) => (
          <tr key={index}>
            <td>${(amount / 100).toFixed(2)}</td>
            <td>{description}</td>
            <td>{source ? source.last4 : null}</td>
            <td>{renderDateTimeFromUnix(created)}</td>
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

PaymentsHistory.propTypes = {
  items: PropTypes.array.isRequired
};

export default PaymentsHistory;