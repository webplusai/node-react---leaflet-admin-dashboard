import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import cl from 'classnames';

import { LinkTo } from '../../helpers';
import { isActive } from '../../utils';

function Header({ isAuthenticated, currentUser, logoutUser }) {
  return (
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkTo className="navbar-brand" href="#">Leaf Admin</LinkTo>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {isAuthenticated ? (
            <Nav>
              {currentUser.is_admin ? (
                <NavItem active={isActive('bundles')} href="/bundles" onSelect={() => browserHistory.push('/bundles')}>
                  Bundles
                </NavItem>
              ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('plans')} href="/plans" onSelect={() => browserHistory.push('/plans')}>
                    Plans
                  </NavItem>
                ) : null}
              {currentUser.is_admin || currentUser.is_partner ? (
                  <NavItem active={isActive('events')} href="/events" onSelect={() => browserHistory.push('/events')}>
                    Events
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('eventTypes')} href="/eventTypes" onSelect={() => browserHistory.push('/eventTypes')}>
                    Event Types
                  </NavItem>
                ) : null}
              {currentUser.is_admin || currentUser.is_partner ? (
                  <NavItem active={isActive('specials')} href="/specials" onSelect={() => browserHistory.push('/specials')}>
                    Specials
                  </NavItem>
                ) : null}
              {currentUser.is_admin || currentUser.is_partner ? (
                  <NavItem active={isActive('boosts')} href="/boosts" onSelect={() => browserHistory.push('/boosts')}>
                    Boosts
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('locations')} href="/locations" onSelect={() => browserHistory.push('/locations')}>
                    Locations
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('locationTypes')} href="/locationTypes" onSelect={() => browserHistory.push('/locationTypes')}>
                    Location Types
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('promoCodes')} href="/promoCodes" onSelect={() => browserHistory.push('/promoCodes')}>
                    PromoCodes
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('users')} href="/users" onSelect={() => browserHistory.push('/users')}>
                    Users
                  </NavItem>
                ) : null}
            </Nav>
          ) : (
            <Nav>
              <NavItem active={isActive('signin')} href="/auth/signin" onSelect={() => browserHistory.push('/auth/signin')}>Sign In</NavItem>
              <NavItem active={isActive('signup')} href="/auth/signup" onSelect={() => browserHistory.push('/auth/signup')}>Sign Up</NavItem>
            </Nav>
          )}
        {isAuthenticated ? (
            <Nav pullRight>
              {currentUser.is_partner ? (
                  <NavItem active={isActive('business')} href="/business" onSelect={() => browserHistory.push('/business')}>
                    Business Profile
                  </NavItem>
                ) : null}
              {currentUser.is_partner ? (
                  <NavItem active={isActive('billing')} href="/billing" onSelect={() => browserHistory.push('/billing')}>
                    Billing
                  </NavItem>
                ) : null}
              <NavItem active={isActive('profile')} href="/profile" onSelect={() => browserHistory.push('/profile')}>
                Settings
              </NavItem>
              <NavItem href="#" onSelect={() => logoutUser()}>
                Sign Out
              </NavItem>
            </Nav>
          ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;