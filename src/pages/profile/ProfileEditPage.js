import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { updateProfile } from '../../actions/UserActions';

import { ProfileForm } from '../../components';

function ProfileEditPage({ currentUser, currentUser: { objectId }, updateProfile }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <ProfileForm
            currentUser={currentUser}
            onSave={user => updateProfile(objectId, user, currentUser)}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(({
  auth: { currentUser }
}) => ({ currentUser }), { updateProfile })(ProfileEditPage);