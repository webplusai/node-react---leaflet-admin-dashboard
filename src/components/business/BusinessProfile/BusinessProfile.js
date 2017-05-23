import size from 'lodash/size';
import React from 'react';

import { BooleanField, LinkTo } from '../../../helpers';
import { capitalize, renderHours, weekDays } from '../../../utils';

function BusinessProfile({ item: { name, phone, hours, neighborhood, reservations, outdoor } }) {
  return (
    <div className="container">
      <div className="row m-b">
        <div className="col-md-6">
          <LinkTo className="btn btn-primary" url="business/edit">Edit Business Profile</LinkTo>
        </div>
        <div className="col-md-6"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered table-hover table-striped table-responsive">
            <tbody>
            <tr>
              <td>Business Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{phone}</td>
            </tr>
            <tr>
              <td>Hours</td>
              <td>
                {size(hours || []) > 0 ? (
                    <table className="table table-bordered table-hover table-striped table-responsive">
                      <tbody>
                      {hours.map(({ day, start, end }, index) => (
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
              <td>Neighborhood</td>
              <td>{neighborhood}</td>
            </tr>
            <tr>
              <td>Takes Reservations</td>
              <td><BooleanField value={reservations} /></td>
            </tr>
            <tr>
              <td>Outdoor Seating</td>
              <td><BooleanField value={outdoor} /></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BusinessProfile;
