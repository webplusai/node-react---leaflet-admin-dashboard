import React from 'react';
import { Route, IndexRoute } from 'react-router';

import UsersIndexPage from './UsersIndexPage';
import UserAddPage from './UserAddPage';
import UserShowPage from './UserShowPage';
import UserEditPage from './UserEditPage';
import UserDeletePage from './UserDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="users">
    <IndexRoute component={RequireAuth(UsersIndexPage)} />
    <Route path="new" component={RequireAuth(UserAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(UserEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(UserDeletePage)} />
    <Route path=":itemID" component={RequireAuth(UserShowPage)} />
  </Route>
);
