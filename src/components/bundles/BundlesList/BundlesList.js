import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';

function BundlesList({ items }) {
  return (
    <table className="table table-bordered table-hover table-striped table-responsive">
      <thead>
      <tr>
        <th>Heading</th>
        <th>Number of Plans</th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, heading, events }) => (
        <tr key={objectId}>
          <td>{heading}</td>
          <td>{size(events)}</td>
          <td>
            <LinkTo className="btn btn-info" url={`bundles/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`bundles/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`bundles/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

BundlesList.propTypes = {
  items: PropTypes.array.isRequired
};

export default BundlesList;