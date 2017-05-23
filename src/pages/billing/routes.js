import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BillingIndexPage from './BillingIndexPage';
import BillingPendingPage from './BillingPendingPage';
import BillingHistoryPage from './BillingHistoryPage';
import PaymentMethodAddPage from './PaymentMethodAddPage';
import PaymentMethodShowPage from './PaymentMethodShowPage';
import PaymentMethodDeletePage from './PaymentMethodDeletePage';

import { RequireAuth } from '../../utils';

export default (
  <Route path="billing">
    <IndexRoute component={RequireAuth(BillingIndexPage)} />
    <Route path="pending" component={RequireAuth(BillingPendingPage)} />
    <Route path="history" component={RequireAuth(BillingHistoryPage)} />
    <Route path="new" component={RequireAuth(PaymentMethodAddPage)} />
    <Route path=":itemID/delete" component={RequireAuth(PaymentMethodDeletePage)} />
    <Route path=":itemID" component={RequireAuth(PaymentMethodShowPage)} />
  </Route>
);
