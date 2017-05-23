import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { MainLayout, Error404 } from './components';
import { Dashboard, auth, business, profile, billing, bundles, plans, events, eventTypes, specials, locations, locationTypes, promoCodes, users, boosts } from './pages';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={Dashboard} />
    {auth}
    {business}
    {profile}
    {billing}
    {bundles}
    {plans}
    {events}
    {eventTypes}
    {specials}
    {locations}
    {locationTypes}
    {promoCodes}
    {users}
    {boosts}
    <Route path="*" component={Error404} />
  </Route>
);