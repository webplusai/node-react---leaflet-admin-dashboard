import React from 'react';
import { Route, IndexRoute } from 'react-router';

import EventTypesIndexPage from './EventTypesIndexPage';
import EventTypeAddPage from './EventTypeAddPage';
import EventTypeShowPage from './EventTypeShowPage';
import EventTypeEditPage from './EventTypeEditPage';
import EventTypeDeletePage from './EventTypeDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="eventTypes">
    <IndexRoute component={RequireAuth(EventTypesIndexPage)} />
    <Route path="new" component={RequireAuth(EventTypeAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(EventTypeEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(EventTypeDeletePage)} />
    <Route path=":itemID" component={RequireAuth(EventTypeShowPage)} />
  </Route>
);
