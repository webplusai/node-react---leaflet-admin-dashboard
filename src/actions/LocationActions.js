import moment from 'moment';
import { browserHistory } from 'react-router';

import { ADD_LOCATIONS, ADD_LOCATION, LOCATION_ERROR, SHOW_LOCATION, REMOVE_LOCATION } from '../constants/Location';

import { apiRequest } from '../utils';

export function addLocations(items = [], count = 0) {
  return {
    type: ADD_LOCATIONS,
    items,
    count
  };
}

export function addLocation(item = {}) {
  return {
    type: ADD_LOCATION,
    item
  };
}

export function locationError(errorMessage) {
  return {
    type: LOCATION_ERROR,
    errorMessage
  };
}

export function showLocation(item = {}) {
  return {
    type: SHOW_LOCATION,
    item
  };
}

export function removeLocation(itemId) {
  return {
    type: REMOVE_LOCATION,
    itemId
  };
}

export function searchLocation({ yelp_id }) {
  const url = [
    'Location?count=1',
    yelp_id ? `&where=${JSON.stringify({
        $or: [
          { yelp_id: { $regex: yelp_id, $options: 'i' } }
        ]
      })}` : null
  ].join('');

  return dispatch => apiRequest.get(url);
}

export function fetchLocations({ search, include, order }) {
  const url = [
    'Location?count=1',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
        $or: [
          { name: { $regex: search, $options: 'i' } }
        ]
      })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addLocations(results, count)));
}

export function fetchLocation(itemId) {
  return dispatch => apiRequest.get('Location', itemId, '?include="location_type"')
    .then(({ data }) => dispatch(showLocation(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createLocation(location) {
  return dispatch => apiRequest.post('Location', {
    ...location,
    location: {
      __type: 'GeoPoint',
      latitude: location.latitude,
      longitude: location.longitude
    },
    location_type: location.location_type ? {
      __type: 'Pointer',
      className: 'LocationType',
      objectId: location.location_type.objectId
    } : null,
  })
    .then(() => browserHistory.push('/locations'))
    .catch(({ response: { data: { error } } }) => dispatch(locationError(error)));
}

export function updateLocation(itemID, location) {
  return dispatch => apiRequest.put('Location', itemID, {
    ...location,
    location: location.latitude && location.longitude ? {
      __type: 'GeoPoint',
      latitude: location.latitude,
      longitude: location.longitude
    } : null,
    location_type: location.location_type ? {
      __type: 'Pointer',
      className: 'LocationType',
      objectId: location.location_type.objectId
    } : null,
  })
    .then(() => browserHistory.push('/locations'))
    .catch(({ response: { data: { error } } }) => dispatch(locationError(error)));
}

export function updateBusiness(itemID, location) {
  return dispatch => apiRequest.put('Location', itemID, location)
    .then(() => browserHistory.push('/business'))
    .catch(({ response: { data: { error } } }) => dispatch(locationError(error)));
}

export function deleteLocation(itemID) {
  return dispatch => apiRequest.delete('Location', itemID)
    .then(() => dispatch(removeLocation(itemID)))
    .then(() => browserHistory.push('/locations'));
}
