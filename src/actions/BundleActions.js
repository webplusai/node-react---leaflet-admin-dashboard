import { browserHistory } from 'react-router';

import { ADD_BUNDLES, ADD_BUNDLE, BUNDLE_ERROR, SHOW_BUNDLE, REMOVE_BUNDLE } from '../constants/Bundle';

import { apiRequest } from '../utils';

export function addBundles(items = []) {
  return {
    type: ADD_BUNDLES,
    items
  };
}

export function addBundle(item = {}) {
  return {
    type: ADD_BUNDLE,
    item
  };
}

export function bundleError(errorMessage) {
  return {
    type: BUNDLE_ERROR,
    errorMessage
  };
}

export function showBundle(item = {}) {
  return {
    type: SHOW_BUNDLE,
    item
  };
}

export function removeBundle(itemId) {
  return {
    type: REMOVE_BUNDLE,
    itemId
  };
}

export function fetchBundles({ search, include, order }) {
  const url = [
    'EventBundle?',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({ heading: { $regex: search, $options: 'i' } })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results } }) => dispatch(addBundles(results)));
}

export function fetchBundle(itemId) {
  return dispatch => apiRequest.get('EventBundle', itemId)
    .then(({ data }) => dispatch(showBundle(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createBundle({ heading, banner }) {
  return dispatch => apiRequest.post('EventBundle', { heading, banner })
    .then(() => browserHistory.push('/bundles'))
    .catch(({ response: { data: { error } } }) => dispatch(bundleError(error)));
}

export function updateBundle(itemID, { heading, banner }) {
  return dispatch => apiRequest.put('EventBundle', itemID, { heading, banner })
    .then(() => browserHistory.push('/bundles'))
    .catch(({ response: { data: { error } } }) => dispatch(bundleError(error)));
}

export function deleteBundle(itemID) {
  return dispatch => apiRequest.delete('EventBundle', itemID)
    .then(() => dispatch(removeBundle(itemID)))
    .then(() => browserHistory.push('/bundles'));
}
