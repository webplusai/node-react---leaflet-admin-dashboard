import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PromoCodesIndexPage from './PromoCodesIndexPage';
import PromoCodeAddPage from './PromoCodeAddPage';
import PromoCodeShowPage from './PromoCodeShowPage';
import PromoCodeEditPage from './PromoCodeEditPage';
import PromoCodeDeletePage from './PromoCodeDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="promoCodes">
    <IndexRoute component={RequireAuth(PromoCodesIndexPage)} />
    <Route path="new" component={RequireAuth(PromoCodeAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(PromoCodeEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(PromoCodeDeletePage)} />
    <Route path=":itemID" component={RequireAuth(PromoCodeShowPage)} />
  </Route>
);
