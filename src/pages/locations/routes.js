import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LocationsIndexPage from './LocationsIndexPage';
import LocationAddPage from './LocationAddPage';
import LocationShowPage from './LocationShowPage';
import LocationEditPage from './LocationEditPage';
import LocationDeletePage from './LocationDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="locations">
    <IndexRoute component={RequireAuth(LocationsIndexPage)} />
    <Route path="new" component={RequireAuth(LocationAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(LocationEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(LocationDeletePage)} />
    <Route path=":itemID" component={RequireAuth(LocationShowPage)} />
  </Route>
);
