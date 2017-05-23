import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BundlesIndexPage from './BundlesIndexPage';
import BundleAddPage from './BundleAddPage';
import BundleShowPage from './BundleShowPage';
import BundleEditPage from './BundleEditPage';
import BundleDeletePage from './BundleDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="bundles">
    <IndexRoute component={RequireAuth(BundlesIndexPage)} />
    <Route path="new" component={RequireAuth(BundleAddPage)} />
    <Route path=":itemID/edit" component={RequireAuth(BundleEditPage)} />
    <Route path=":itemID/delete" component={RequireAuth(BundleDeletePage)} />
    <Route path=":itemID" component={RequireAuth(BundleShowPage)} />
  </Route>
);
