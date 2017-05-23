import React from 'react';
import { Route, IndexRoute } from 'react-router';

import EventsIndexPage from './EventsIndexPage';
import EventAddPage from './EventAddPage';
import EventShowPage from './EventShowPage';
import EventEditPage from './EventEditPage';
import EventDeletePage from './EventDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="events">
    <IndexRoute component={RequireAuth(EventsIndexPage)} />
    <Route path="new" component={RequireAuth(EventAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(EventEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(EventDeletePage)} />
    <Route path=":itemID" component={RequireAuth(EventShowPage)} />
  </Route>
);
