import isObject from 'lodash/isObject';
import size from 'lodash/size';
import React, { PropTypes } from 'react';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';

import { LinkTo } from '../../../helpers';
import { capitalize, renderDate, renderDateTime, weekDays, renderHours } from '../../../utils';

function SpecialsList({ items }) {

  if (size(items) > 0) {
    return (
      <table className="table table-bordered table-hover table-striped table-responsive">
        <thead>
        <tr>
          <th>Incentive Name</th>
          <th>Category</th>
          <th>Incentive Type</th>
          <th>Attendee Minimum</th>
          <th>Item Name</th>
          <th>Redemption Options</th>
          <th>Promo Code</th>
          <th>Days</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Created</th>
          <th />
          <th />
          <th />
        </tr>
        </thead>
        <tbody>
        {items.map(({objectId, incentive_name, category, incentive_type, attendee_min, item_name, redemption_options, promo_code, days, start_date, end_date, status, createdAt}) => (
          <tr key={objectId}>
            <td>{incentive_name}</td>
            <td>{category ? category.name : null}</td>
            <td>{incentive_type ? incentive_type.name : null}</td>
            <td>{attendee_min}</td>
            <td>{item_name}</td>
            <td>{redemption_options ? redemption_options.name : null}</td>
            <td>{promo_code}</td>
            <td>
              {size(days || []) > 0 ? (
                  <OverlayTrigger
                    trigger={['hover', 'focus']}
                    placement="left"
                    overlay={(
                      <Popover id={`special-${objectId}-days`} title="Days">
                        <table className="table table-bordered table-hover table-striped table-responsive">
                          <tbody>
                          {(days || []).map(({ day, start, end }, index) => (
                            <tr key={index}>
                              <td>{capitalize(weekDays[day])}</td>
                              <td>{renderHours(start)}</td>
                              <td>{renderHours(end)}</td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </Popover>
                    )}
                  >
                    <Button>{size(days)}</Button>
                  </OverlayTrigger>
                ) : null}
            </td>
            <td>{renderDateTime(start_date)}</td>
            <td>{renderDateTime(end_date)}</td>
            <td>{isObject(status) ? status.name : status}</td>
            <td>{renderDate(createdAt)}</td>
            <td>
              <LinkTo className="btn btn-info" url={`specials/${objectId}`}>Show</LinkTo>
            </td>
            <td>
              <LinkTo className="btn btn-primary" url={`specials/${objectId}/edit`}>Edit</LinkTo>
            </td>
            <td>
              <LinkTo className="btn btn-danger" url={`specials/${objectId}/delete`}>Delete</LinkTo>
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

SpecialsList.propTypes = {
  items: PropTypes.array.isRequired
};

export default SpecialsList;