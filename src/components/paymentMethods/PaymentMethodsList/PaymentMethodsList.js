import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDate } from '../../../utils';

function PaymentMethodsList({ items }) {

  if (size(items) > 0) {
    return (
      <table className="table table-bordered table-hover table-striped table-responsive">
        <thead>
        <tr>
          <th>Number</th>
          <th>Year</th>
          <th>Month</th>
          <th>Created</th>
          <th />
          <th />
        </tr>
        </thead>
        <tbody>
        {items.map(({objectId, number, exp_year, exp_month, createdAt}) => (
          <tr key={objectId}>
            <td>{number ? `Last 4 digits ${number}` : null}</td>
            <td>{exp_year}</td>
            <td>{exp_month}</td>
            <td>{renderDate(createdAt)}</td>
            <td>
              <LinkTo className="btn btn-info" url={`billing/${objectId}`}>Show</LinkTo>
            </td>
            <td>
              <LinkTo className="btn btn-danger" url={`billing/${objectId}/delete`}>Delete</LinkTo>
            </td>
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

PaymentMethodsList.propTypes = {
  items: PropTypes.array.isRequired
};

export default PaymentMethodsList;