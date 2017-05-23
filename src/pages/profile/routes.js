import React from 'react';
import { Route, IndexRoute } from 'react-router';

import ProfilePage from './ProfilePage';
import ProfileEditPage from './ProfileEditPage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="profile">
    <IndexRoute component={RequireAuth(ProfilePage)} />
    <Route path="edit" component={RequireAuth(ProfileEditPage)} />
  </Route>
);
