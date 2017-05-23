import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { LinkTo, BooleanField } from '../../../helpers';
import { renderDateTime, weekDays, capitalize } from '../../../utils';

function PlanItem({
  item, item: {
    objectId,
    bundle,
    title_event, description_event, image, type_event,
    tags, locations,
    partner, start_day, count_attended, is21_age, estimated_cost, end_day,
    featured, featured_name, featured_link, first_message,
    createdAt, updatedAt
  }
}) {
  return (
    <div>
      <h1>Plan #{objectId}</h1>
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Bundle</td>
          <td>{bundle ? <LinkTo url={`bundles/${bundle.objectId}`}>{bundle.objectId}</LinkTo> : null}</td>
        </tr>
        <tr>
          <td>Title Event</td>
          <td>{title_event}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{description_event}</td>
        </tr>
        <tr>
          <td>Tags</td>
          <td>{(tags || []).join(', ')}</td>
        </tr>
        <tr>
          <td>Partner</td>
          <td>
            <BooleanField value={partner} />
          </td>
        </tr>
        <tr>
          <td>Start Day</td>
          <td>{start_day ? renderDateTime(start_day.iso) : null}</td>
        </tr>
        <tr>
          <td>Number of Attendees</td>
          <td>{count_attended}</td>
        </tr>
        <tr>
          <td>Experience Type</td>
          <td>{type_event}</td>
        </tr>
        <tr>
          <td>Only 21+ Allowed</td>
          <td>
            <BooleanField value={is21_age} />
          </td>
        </tr>
        <tr>
          <td>Estimated Cost</td>
          <td>{estimated_cost}</td>
        </tr>
        <tr>
          <td>End Date</td>
          <td>{end_day ? renderDateTime(end_day.iso) : null}</td>
        </tr>
        {weekDays.map(day => (
          <tr key={day}>
            <td>Every {capitalize(day)}</td>
            <td>
              <BooleanField value={item[`reoccur_${day}`]} />
            </td>
          </tr>
        ))}
        <tr>
          <td>Featured</td>
          <td>
            <BooleanField value={featured} />
          </td>
        </tr>
        <tr>
          <td>Featured Name</td>
          <td>{featured_name}</td>
        </tr>
        <tr>
          <td>Featured Link</td>
          <td>{featured_link}</td>
        </tr>
        <tr>
          <td>First Message</td>
          <td>{first_message}</td>
        </tr>
        <tr>
          <td>Locations</td>
          <td>
            {locations && size(locations) > 0 ? (
                <table className="table table-bordered table-hover table-striped table-responsive">
                <tbody>
                {locations.map(({ location, time }, index) => (
                  <tr key={index}>
                    <td>{location.name}</td>
                    <td>{time}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              ) : null}
          </td>
        </tr>
        <tr>
          <td>Banner</td>
          <td>
            {image ? <img className="show-image img-responsive" src={image} alt="" /> : null}
          </td>
        </tr>
        <tr>
          <td>Created</td>
          <td>{renderDateTime(createdAt)}</td>
        </tr>
        <tr>
          <td>Updated</td>
          <td>{renderDateTime(updatedAt)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

PlanItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default PlanItem;