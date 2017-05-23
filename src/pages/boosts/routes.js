import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BoostsIndexPage from './BoostsIndexPage';
import BoostAddPage from './BoostAddPage';
import BoostShowPage from './BoostShowPage';
import BoostEditPage from './BoostEditPage';
import BoostDeletePage from './BoostDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="boosts">
    <IndexRoute component={RequireAuth(BoostsIndexPage)} />
    <Route path="new" component={RequireAuth(BoostAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(BoostEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(BoostDeletePage)} />
    <Route path=":itemID" component={RequireAuth(BoostShowPage)} />
  </Route>
);
