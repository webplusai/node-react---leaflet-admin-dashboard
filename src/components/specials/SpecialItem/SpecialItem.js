import isObject from 'lodash/isObject';
import size from 'lodash/size';
import React, { PropTypes } from 'react';

import { capitalize, fileUrl, renderDateTime, renderHours, weekDays } from '../../../utils';

function SpecialItem({
  item: {
    objectId, incentive_name, category, incentive_type, attendee_min, amount, item_name, description,
    redemption_options, promo_code, days, start_date, end_date, without_end_date, image, status, createdAt
  }
}) {
  return (
    <div>
      <h1>Special #{objectId}</h1>
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
        <tr>
          <td>ObjectId</td>
          <td>{objectId}</td>
        </tr>
        <tr>
          <td>Incentive Name</td>
          <td>{incentive_name}</td>
        </tr>
        <tr>
          <td>Category</td>
          <td>{category ? category.name : null}</td>
        </tr>
        <tr>
          <td>Incentive Type</td>
          <td>{incentive_type ? incentive_type.name : null}</td>
        </tr>
        <tr>
          <td>Attendee Minimum</td>
          <td>{attendee_min}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>{amount}</td>
        </tr>
        <tr>
          <td>Item Name</td>
          <td>{item_name}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{description}</td>
        </tr>
        <tr>
          <td>Redemption Options</td>
          <td>{redemption_options ? redemption_options.name : null}</td>
        </tr>
        <tr>
          <td>Promo Code</td>
          <td>{promo_code}</td>
        </tr>
        <tr>
          <td>Days</td>
          <td>
            {size(days || []) > 0 ? (
              <table className="table table-bordered table-hover table-striped table-responsive">
                <tbody>
                {days.map(({ day, start, end }, index) => (
                  <tr key={index}>
                    <td>{capitalize(weekDays[day])}</td>
                    <td>{renderHours(start)}</td>
                    <td>{renderHours(end)}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              ) : null}
          </td>
        </tr>
        <tr>
          <td>Start Date</td>
          <td>{renderDateTime(start_date)}</td>
        </tr>
        <tr>
          <td>End Date</td>
          <td>{without_end_date ? 'Without End date' : renderDateTime(end_date)}</td>
        </tr>
        <tr>
          <td>Image</td>
          <td>{image ? <img className="show-image img-responsive" src={fileUrl(image.path)} alt="" /> : null}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{isObject(status) ? status.name : status}</td>
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

SpecialItem.propTypes = {
  item: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
};

export default SpecialItem;