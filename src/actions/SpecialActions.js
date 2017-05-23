import pickBy from 'lodash/pickBy';
import isNull from 'lodash/isNull';
import { browserHistory } from 'react-router';

import { ADD_SPECIALS, ADD_SPECIAL, SPECIAL_ERROR, SHOW_SPECIAL, REMOVE_SPECIAL } from '../constants/Special';

import { apiRequest } from '../utils';

export function addSpecials(items = [], count = 0) {
  return {
    type: ADD_SPECIALS,
    items,
    count
  };
}

export function addSpecial(item = {}) {
  return {
    type: ADD_SPECIAL,
    item
  };
}

export function specialError(errorMessage) {
  return {
    type: SPECIAL_ERROR,
    errorMessage
  };
}

export function showSpecial(item = {}) {
  return {
    type: SHOW_SPECIAL,
    item
  };
}

export function removeSpecial(itemId) {
  return {
    type: REMOVE_SPECIAL,
    itemId
  };
}

export function fetchSpecials({ search, include, order }, { is_admin, objectId }) {
  const user = is_admin ? {} : {
    __type: 'Pointer',
    className: 'Partner',
    objectId
  };

  const query = pickBy({
    $or: search ? [
        { incentive_name: { $regex: search, $options: 'i' } }
      ] : null,
    user: is_admin ? null : user
  }, v => !isNull(v));

  const url = [
    'Special?count=1',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    `&where=${JSON.stringify(query)}`
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addSpecials(results, count)));
}

export function fetchSpecial(itemId) {
  return dispatch => apiRequest.get('Special', itemId)
    .then(({ data }) => dispatch(showSpecial(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createSpecial(special, { objectId }) {
  return dispatch => apiRequest.post('Special', {
    ...special,
    status: 'active',
    user: {
      __type: 'Pointer',
      className: 'Partner',
      objectId
    },
  })
    .then(() => browserHistory.push('/specials'))
    .catch(({ response: { data: { error } } }) => dispatch(specialError(error)));
}

export function updateSpecial(itemID, special) {
  return dispatch => apiRequest.put('Special', itemID, {
    ...special,
    status: 'active'
  })
    .then(() => browserHistory.push('/specials'))
    .catch(({ response: { data: { error } } }) => dispatch(specialError(error)));
}

export function deleteSpecial(itemID) {
  return dispatch => apiRequest.delete('Special', itemID)
    .then(() => dispatch(removeSpecial(itemID)))
    .then(() => browserHistory.push('/specials'));
}
