import moment from 'moment';
import { browserHistory } from 'react-router';

import { UPDATE_CURRENT_USER } from '../constants/Auth';
import { ADD_USERS, ADD_USER, USER_ERROR, SHOW_USER, REMOVE_USER } from '../constants/User';

import { apiRequest } from '../utils';

export function addUsers(items = [], count = 0) {
  return {
    type: ADD_USERS,
    items,
    count
  };
}

export function addUser(item = {}) {
  return {
    type: ADD_USER,
    item
  };
}

export function userError(errorMessage) {
  return {
    type: USER_ERROR,
    errorMessage
  };
}

export function showUser(item = {}) {
  return {
    type: SHOW_USER,
    item
  };
}

export function updateCurrentUser(currentUser = {}) {
  return {
    type: UPDATE_CURRENT_USER,
    currentUser
  };
}

export function removeUser(itemId) {
  return {
    type: REMOVE_USER,
    itemId
  };
}

export function fetchUsers({ search, include, order, limit, page }) {
  const url = [
    'User?count=1',
    limit ? `&limit=${limit}` : null,
    page && (page > 1) ? `&skip=${page * limit}` : null,
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
        $or: [
          { first_name: { $regex: search, $options: 'i' } },
          { last_name: { $regex:  search, $options: 'i' } },
          { user_email: { $regex:  search, $options: 'i' } },
        ]
      })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addUsers(results, count)));
}

export function fetchUser(itemId) {
  return dispatch => apiRequest.get('User', itemId)
    .then(({ data }) => dispatch(showUser(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createUser(user) {
  return dispatch => apiRequest.post('User', {
    ...user,
    birthday: user.birthday ? moment(user.birthday).format('MM/DD/YYYY') : null
  })
    .then(() => browserHistory.push('/users'))
    .catch(({ response: { data: { error } } }) => dispatch(userError(error)));
}

export function updateUser(itemID, user) {
  return dispatch => apiRequest.put('User', itemID, {
    ...user,
    birthday: user.birthday ? moment(user.birthday).format('MM/DD/YYYY') : null
  })
    .then(() => browserHistory.push('/users'))
    .catch(({ response: { data: { error } } }) => dispatch(userError(error)));
}

export function updateProfile(itemID, user, currentUser) {
  return dispatch => apiRequest.put('Partner', itemID, user)
    .then(() => dispatch(updateCurrentUser({
      ...currentUser,
      ...user
    })))
    .then(() => browserHistory.push('/profile'))
    .catch(({ response: { data: { error } } }) => dispatch(userError(error)));
}

export function deleteUser(itemID) {
  return dispatch => apiRequest.delete('User', itemID)
    .then(() => dispatch(removeUser(itemID)))
    .then(() => browserHistory.push('/users'));
}
