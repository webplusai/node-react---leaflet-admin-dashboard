import compact from 'lodash/compact';
import React, { PropTypes } from 'react';

import { LinkTo } from '../../../helpers';
import { renderDate } from '../../../utils';

function PlansList({ items }) {
  return (
    <table className="table table-bordered table-hover table-striped table-responsive">
      <thead>
      <tr>
        <th>Banner</th>
        <th>Bundle</th>
        <th>Title</th>
        <th>Tags</th>
        <th>Neighborhood</th>
        <th>
          Start
        </th>
        <th>
          End
        </th>
        <th />
        <th />
        <th />
      </tr>
      </thead>
      <tbody>
      {items.map(({ objectId, image, bundle, title_event, tags, locations, start_day, end_day }) => (
        <tr key={objectId}>
          <td>
            {image ? (
                <LinkTo url={`plans/${objectId}`}>
                  <img className="list-image img-responsive" src={image} alt="" />
                </LinkTo>
              ) : null}
          </td>
          <td>
            {bundle ? (
                <LinkTo url={`bundles/${bundle.objectId}`}>
                  {bundle.heading}
                </LinkTo>
              ) : null}
          </td>
          <td>{title_event}</td>
          <td>{(tags || []).join(', ')}</td>
          <td>{compact((locations || []).map(l => l.location ? l.location.neighborhood : null)).join(', ')}</td>
          <td>{start_day ? renderDate(start_day.iso) : null}</td>
          <td>{end_day ? renderDate(end_day.iso) : null}</td>
          <td>
            <LinkTo className="btn btn-info" url={`plans/${objectId}`}>Show</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-primary" url={`plans/${objectId}/edit`}>Edit</LinkTo>
          </td>
          <td>
            <LinkTo className="btn btn-danger" url={`plans/${objectId}/delete`}>Delete</LinkTo>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

PlansList.propTypes = {
  items: PropTypes.array.isRequired
};

export default PlansList;