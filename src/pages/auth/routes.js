import React from 'react';
import { Route } from 'react-router';

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

export default (
  <Route path="auth">
    <Route path="signin" component={LoginPage} />
    <Route path="signup" component={SignupPage} />
  </Route>
);
