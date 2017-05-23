import React from 'react';
import { connect } from 'react-redux';

import { LinkTo } from '../../helpers';

function ProfilePage({ currentUser: { first_name, last_name, personal_phone, job_title } }) {
  return (
    <div className="container">
      <div className="row m-b">
        <div className="col-md-6">
          <LinkTo className="btn btn-primary" url="profile/edit">Edit Profile</LinkTo>
        </div>
        <div className="col-md-6"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered table-hover table-striped table-responsive">
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{last_name}</td>
              </tr>
              <tr>
                <td>Personal Phone Number</td>
                <td>{personal_phone}</td>
              </tr>
              <tr>
                <td>Job Title</td>
                <td>{job_title}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default connect(({
  auth: { currentUser }
}) => ({ currentUser }))(ProfilePage);
