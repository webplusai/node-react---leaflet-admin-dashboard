import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LocationTypesIndexPage from './LocationTypesIndexPage';
import LocationTypeAddPage from './LocationTypeAddPage';
import LocationTypeShowPage from './LocationTypeShowPage';
import LocationTypeEditPage from './LocationTypeEditPage';
import LocationTypeDeletePage from './LocationTypeDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="locationTypes">
    <IndexRoute component={RequireAuth(LocationTypesIndexPage)} />
    <Route path="new" component={RequireAuth(LocationTypeAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(LocationTypeEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(LocationTypeDeletePage)} />
    <Route path=":itemID" component={RequireAuth(LocationTypeShowPage)} />
  </Route>
);
