import { browserHistory } from 'react-router';

import { ADD_LOCATION_TYPES, ADD_LOCATION_TYPE, LOCATION_TYPE_ERROR, SHOW_LOCATION_TYPE, REMOVE_LOCATION_TYPE } from '../constants/LocationType';

import { apiRequest } from '../utils';

export function addLocationTypes(items = [], count = 0) {
  return {
    type: ADD_LOCATION_TYPES,
    items,
    count
  };
}

export function addLocationType(item = {}) {
  return {
    type: ADD_LOCATION_TYPE,
    item
  };
}

export function locationTypeError(errorMessage) {
  return {
    type: LOCATION_TYPE_ERROR,
    errorMessage
  };
}

export function showLocationType(item = {}) {
  return {
    type: SHOW_LOCATION_TYPE,
    item
  };
}

export function removeLocationType(itemId) {
  return {
    type: REMOVE_LOCATION_TYPE,
    itemId
  };
}

export function fetchLocationTypes({ search, include, order }) {
  const url = [
    'LocationType?count=1',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
        $or: [
          { name: { $regex: search, $options: 'i' } }
        ]
      })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addLocationTypes(results, count)));
}

export function fetchLocationType(itemId) {
  return dispatch => apiRequest.get('LocationType', itemId)
    .then(({ data }) => dispatch(showLocationType(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createLocationType(locationType) {
  return dispatch => apiRequest.post('LocationType', locationType)
    .then(() => browserHistory.push('/locationTypes'))
    .catch(({ response: { data: { error } } }) => dispatch(locationTypeError(error)));
}

export function updateLocationType(itemID, locationType) {
  return dispatch => apiRequest.put('LocationType', itemID, locationType)
    .then(() => browserHistory.push('/locationTypes'))
    .catch(({ response: { data: { error } } }) => dispatch(locationTypeError(error)));
}

export function deleteLocationType(itemID) {
  return dispatch => apiRequest.delete('LocationType', itemID)
    .then(() => dispatch(removeLocationType(itemID)))
    .then(() => browserHistory.push('/locationTypes'));
}
