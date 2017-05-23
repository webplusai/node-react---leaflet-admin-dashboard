import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { LinkTo, BooleanField } from '../../../helpers';
import { renderDateTime } from '../../../utils';

function EventItem({
  item: {
    objectId, event_type, dates, start_time, end_time, location, description, redemption, cost,
    add_criteria, gender, age, boost, boost_type, comments_for_reviewer, boost_status,
    boost_invites_sent, boost_invites_accepted, boost_attendees, special, createdAt
  }
}) {
  return (
    <div>
      <h1>Event #{objectId}</h1>
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Event Type</td>
          <td>
            {event_type ? <LinkTo url={`eventTypes/${event_type.objectId}`}>{event_type.name}</LinkTo> : null}
          </td>
        </tr>
        <tr>
          <td>Dates</td>
          <td>
            {size(dates || []) > 0 ? (
                <table className="table table-bordered table-hover table-striped table-responsive">
                  <tbody>
                  {dates.map(({ date, name, start, end }, index) => (
                    <tr key={index}>
                      <td>{date}</td>
                      <td>{name}</td>
                      <td>{start}</td>
                      <td>{end}</td>
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
        <tr>
          <td>End Time</td>
          <td>{renderDateTime(end_time)}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{location ? <LinkTo url={`locations/${location.objectId}`}>{location.name}</LinkTo> : null}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{description}</td>
        </tr>
        <tr>
          <td>Redemption</td>
          <td>{redemption ? redemption.name : null}</td>
        </tr>
        <tr>
          <td>Cost</td>
          <td>{cost ? cost : 'Free'}</td>
        </tr>
        <tr>
          <td>Add Criteria</td>
          <td><BooleanField value={add_criteria} /></td>
        </tr>
        <tr>
          <td>Gender Criteria</td>
          <td>{gender ? gender.name : null}</td>
        </tr>
        <tr>
          <td>Age Criteria</td>
          <td>{age ? age.name : null}</td>
        </tr>
        <tr>
          <td>Boost</td>
          <td><BooleanField value={boost} /></td>
        </tr>
        <tr>
          <td>Boost Type</td>
          <td>{boost_type ? boost_type.name : null}</td>
        </tr>
        <tr>
          <td>Comments For Reviewer</td>
          <td>{comments_for_reviewer}</td>
        </tr>
        <tr>
          <td>Boost Status</td>
          <td>{boost_status ? boost_status.name : null}</td>
        </tr>
        <tr>
          <td>Boost Invites Sent</td>
          <td>{boost_invites_sent}</td>
        </tr>
        <tr>
          <td>Boost Invites Accepted</td>
          <td>{boost_invites_accepted}</td>
        </tr>
        <tr>
          <td>Boost Attendees</td>
          <td>{boost_attendees}</td>
        </tr>
        <tr>
          <td>Special</td>
          <td>{special ? <LinkTo url={`specials/${special.objectId}`}>{special.incentive_name}</LinkTo> : null}</td>
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

EventItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default EventItem;