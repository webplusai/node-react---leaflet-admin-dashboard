import { browserHistory } from 'react-router';

import { ADD_EVENT_TYPES, ADD_EVENT_TYPE, EVENT_TYPE_ERROR, SHOW_EVENT_TYPE, REMOVE_EVENT_TYPE } from '../constants/EventType';

import { apiRequest } from '../utils';

export function addEventTypes(items = [], count = 0) {
  return {
    type: ADD_EVENT_TYPES,
    items,
    count
  };
}

export function addEventType(item = {}) {
  return {
    type: ADD_EVENT_TYPE,
    item
  };
}

export function eventTypeError(errorMessage) {
  return {
    type: EVENT_TYPE_ERROR,
    errorMessage
  };
}

export function showEventType(item = {}) {
  return {
    type: SHOW_EVENT_TYPE,
    item
  };
}

export function removeEventType(itemId) {
  return {
    type: REMOVE_EVENT_TYPE,
    itemId
  };
}

export function fetchEventTypes({ search, include, order }) {
  const url = [
    'EventType?count=1',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
        $or: [
          { name: { $regex: search, $options: 'i' } }
        ]
      })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addEventTypes(results, count)));
}

export function fetchEventType(itemId) {
  return dispatch => apiRequest.get('EventType', itemId)
    .then(({ data }) => dispatch(showEventType(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createEventType(eventType) {
  return dispatch => apiRequest.post('EventType', eventType)
    .then(() => browserHistory.push('/eventTypes'))
    .catch(({ response: { data: { error } } }) => dispatch(eventTypeError(error)));
}

export function updateEventType(itemID, eventType) {
  return dispatch => apiRequest.put('EventType', itemID, eventType)
    .then(() => browserHistory.push('/eventTypes'))
    .catch(({ response: { data: { error } } }) => dispatch(eventTypeError(error)));
}

export function deleteEventType(itemID) {
  return dispatch => apiRequest.delete('EventType', itemID)
    .then(() => dispatch(removeEventType(itemID)))
    .then(() => browserHistory.push('/eventTypes'));
}
