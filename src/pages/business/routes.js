import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BusinessPage from './BusinessPage';
import BusinessEditPage from './BusinessEditPage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="business">
    <IndexRoute component={RequireAuth(BusinessPage)} />
    <Route path="edit" component={RequireAuth(BusinessEditPage)} />
  </Route>
);
