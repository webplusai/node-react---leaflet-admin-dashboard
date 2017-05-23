import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { Button, BooleanField } from '../../../helpers';
import { renderDateTime } from '../../../utils';

function BoostItem({
  item: {
    objectId, name, dates, start_time, end_time, with_max_budget, max_budget, approved, boost_type, invites_sent, invites_accepted, createdAt
  },
  toggleApproved
}) {
  return (
    <div>
      <h1>Boost #{objectId}</h1>
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Boost Name</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Dates</td>
          <td>
            {size(dates || []) > 0 ? (
                <table className="table table-bordered table-hover table-striped table-responsive">
                  <tbody>
                  {dates.map(({ date, parts }, index) => (
                    <tr key={index}>
                      <td>{date}</td>
                      <td>{(parts || []).map(part => part.name).join(', ')}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              ) : null}
          </td>
        </tr>
        <tr>
          <td>Start Time</td>
          <td>{renderDateTime(start_time)}</td>
        </tr>
        {with_max_budget ? null : (
          <tr>
            <td>End Time</td>
            <td>{renderDateTime(end_time)}</td>
          </tr>
        )}
        {with_max_budget ? (
          <tr>
            <td>Max Budget</td>
            <td>{max_budget}</td>
          </tr>
        ) : null}
        <tr>
          <td>Approved?</td>
          <td><BooleanField value={approved}/></td>
        </tr>
        <tr>
          <td>Boost Type</td>
          <td>{boost_type ? boost_type.name : null}</td>
        </tr>
        <tr>
          <td>Invites Sent</td>
          <td>{invites_sent}</td>
        </tr>
        <tr>
          <td>Invites Accepted</td>
          <td>{invites_accepted}</td>
        </tr>
        <tr>
          <td>Created</td>
          <td>{renderDateTime(createdAt)}</td>
        </tr>
        </tbody>
      </table>
      <Button color={approved ? 'danger' : 'success'} onClick={() => toggleApproved()}>{approved ? 'Unapprove' : 'Approve'}</Button>
    </div>
  );
}

BoostItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  toggleApproved: PropTypes.func.isRequired
};

export default BoostItem;