import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';

import { facebookLoginUser } from '../../actions/AuthActions';

import { DataTable } from '../../components';

import { FACEBOOK_APP_ID } from '../../config';

function Dashboard({ isAuthenticated, errorMessage, currentUser, facebookLoginUser }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          {isAuthenticated ? (
              <h1>Dashboard</h1>
            ) : (
              <div>
                <FacebookLogin
                  appId={FACEBOOK_APP_ID}
                  fields="name,email,picture"
                  callback={({ email, accessToken }) => facebookLoginUser({ email, accessToken })}
                  cssClass="btn btn-primary"
                />
                {errorMessage ? <div className="alert alert-danger m-t">{errorMessage}</div> : null }
              </div>
            )}
        </div>
      </div>
      {isAuthenticated && currentUser.is_admin ? <DataTable /> : null}
    </div>
  );
}

export default connect(({
  auth: {
    isAuthenticated,
    errorMessage,
    currentUser
  }
}) => ({ isAuthenticated, errorMessage, currentUser }), { facebookLoginUser })(Dashboard);
