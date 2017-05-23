import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PlansIndexPage from './PlansIndexPage';
import PlanAddPage from './PlanAddPage';
import PlanShowPage from './PlanShowPage';
import PlanEditPage from './PlanEditPage';
import PlanDeletePage from './PlanDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="plans">
    <IndexRoute component={RequireAuth(PlansIndexPage)} />
    <Route path="new" component={RequireAuth(PlanAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(PlanEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(PlanDeletePage)} />
    <Route path=":itemID" component={RequireAuth(PlanShowPage)} />
  </Route>
);
