import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { BooleanField, LinkTo } from '../../../helpers';
import { renderDate, renderDateTime } from '../../../utils';

function BoostsList({ items }) {

  if (size(items) > 0) {
    return (
      <table className="table table-bordered table-hover table-striped table-responsive">
        <thead>
        <tr>
          <th>Boost Name</th>
          <th>Dates</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Max Budget</th>
          <th>Approved?</th>
          <th>Boost Type</th>
          <th>Created</th>
          <th />
          <th />
          <th />
        </tr>
        </thead>
        <tbody>
        {items.map(({objectId, name, dates, start_time, end_time, with_max_budget, max_budget, approved, boost_type, createdAt}) => (
          <tr key={objectId}>
            <td>
              <LinkTo url={`boosts/${objectId}`}>{name}</LinkTo>
            </td>
            <td>
              {size(dates || []) > 0 ? (
                  <table className="table table-bordered table-hover table-striped table-responsive">
                    <tbody>
                    {(dates || []).map(({ date, parts }, index) => (
                      <tr key={index}>
                        <td>{date}</td>
                        <td>{(parts || []).map(part => part.name).join(', ')}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                ) : null}
            </td>
            <td>{renderDateTime(start_time)}</td>
            <td>{with_max_budget ? null : renderDateTime(end_time)}</td>
            <td>{with_max_budget ? max_budget : null}</td>
            <td><BooleanField value={approved} /></td>
            <td>{boost_type ? boost_type.name : null}</td>
            <td>{renderDate(createdAt)}</td>
            <td>
              <LinkTo className="btn btn-info" url={`boosts/${objectId}`}>Show</LinkTo>
            </td>
            <td>
              <LinkTo className="btn btn-primary" url={`boosts/${objectId}/edit`}>Edit</LinkTo>
            </td>
            <td>
              <LinkTo className="btn btn-danger" url={`boosts/${objectId}/delete`}>Delete</LinkTo>
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

BoostsList.propTypes = {
  items: PropTypes.array.isRequired
};

export default BoostsList;