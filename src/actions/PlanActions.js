import filter from 'lodash/filter';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import { browserHistory } from 'react-router';

import { ADD_PLANS, ADD_PLAN, PLAN_ERROR, SHOW_PLAN, REMOVE_PLAN } from '../constants/Plan';

import { apiRequest } from '../utils';

export function addPlans(items = [], count = 0) {
  return {
    type: ADD_PLANS,
    items,
    count
  };
}

export function addPlan(item = {}) {
  return {
    type: ADD_PLAN,
    item
  };
}

export function planError(errorMessage) {
  return {
    type: PLAN_ERROR,
    errorMessage
  };
}

export function showPlan(item = {}) {
  return {
    type: SHOW_PLAN,
    item
  };
}

export function removePlan(itemId) {
  return {
    type: REMOVE_PLAN,
    itemId
  };
}

export function fetchPlans({ search, include, order, limit, page }) {
  const url = [
    'EventDetail?count=1',
    limit ? `&limit=${limit}` : null,
    page && (page > 1) ? `&skip=${page * limit}` : null,
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
      $or: [
        { title_event: { $regex: search, $options: 'i' } },
        { description_event: { $regex:  search, $options: 'i' } }
      ]
    })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addPlans(results, count)));
}

export function fetchPlan(itemId, { include = 'locations.location' }) {
  return dispatch => apiRequest.get('EventDetail', itemId, `?include="${include}"`)
    .then(({ data }) => dispatch(showPlan(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createPlan({
  bundle,
  title_event, description_event, image, type_event,
  tags, locations, location,
  partner, start_day, count_attended, is21_age, estimated_cost, end_day,
  reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
  featured, featured_name, featured_link, first_message
}) {
  console.log('locations', locations);
  return dispatch => apiRequest.post('EventDetail', {
    bundle: bundle ? {
      __type: 'Pointer',
      className: 'EventBundle',
      objectId: bundle.objectId
    } : null,
    start_day: start_day ? {
      __type: 'Date',
      iso: start_day
    } : null,
    end_day: end_day ? {
      __type: 'Date',
      iso: end_day
    } : null,
    locations: (locations || []).map(l => ({
      time: l.time,
      location: {
        __type: 'Pointer',
        className: 'Location',
        objectId: l.location.objectId
      }
    })),
    lookupLocations: (locations || []).map(l => ({
      __type: 'Pointer',
      className: 'Location',
      objectId: l.location.objectId
    })),
    title_event, description_event, image, type_event,
    tags, location,
    partner, count_attended: parseInt(count_attended, 10), is21_age, estimated_cost,
    reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
    featured, featured_name, featured_link, first_message
  })
    .then(({ data }) => {
      const eventId = data.objectId;
      const objectId = bundle ? bundle.objectId : null;

      if (objectId) {
        apiRequest.get(`EventBundle/${objectId}?include=event`, objectId).then(({ data }) =>
          apiRequest.put('EventBundle', objectId, {
          events: uniqWith([
            ...(data.events || []),
            {
              __type: 'Pointer',
              className: 'EventDetail',
              objectId: eventId
            }
          ], isEqual)
        }));
      }
    })
    .then(() => browserHistory.push('/plans'))
    .catch(({ response: { data: { error } } }) => dispatch(planError(error)));
}

export function updatePlan(itemID, {
  bundle,
  title_event, description_event, image, type_event,
  tags, locations, location,
  partner, start_day, count_attended, is21_age, estimated_cost, end_day,
  reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
  featured, featured_name, featured_link, first_message
}, item) {
  return dispatch => apiRequest.put('EventDetail', itemID, {
    bundle: bundle ? {
        __type: 'Pointer',
        className: 'EventBundle',
        objectId: bundle.objectId
      } : null,
    start_day: start_day ? {
        __type: 'Date',
        iso: start_day
      } : null,
    end_day: end_day ? {
        __type: 'Date',
        iso: end_day
      } : null,
    locations: (locations || []).map(l => ({
      time: l.time,
      location: {
        __type: 'Pointer',
        className: 'Location',
        objectId: l.location.objectId
      }
    })),
    lookupLocations: (locations || []).map(l => ({
      __type: 'Pointer',
      className: 'Location',
      objectId: l.location.objectId
    })),
    title_event, description_event, image, type_event,
    tags, location,
    partner, count_attended: parseInt(count_attended, 10), is21_age, estimated_cost,
    reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
    featured, featured_name, featured_link, first_message
  })
    .then(() => {
      const objectId = item.bundle.objectId;

      if (objectId) {
        apiRequest.get(`EventBundle/${objectId}?include=event`, objectId).then(({ data }) =>
          apiRequest.put('EventBundle', objectId, {
            events: filter((data.events || []), (e => e.objectId !== itemID))
          })
        );
      }
    })
    .then(() => {
      const objectId = bundle ? bundle.objectId : null;

      if (objectId) {
        apiRequest.get(`EventBundle/${objectId}?include=event`, objectId).then(({ data }) => {
            apiRequest.put('EventBundle', objectId, {
              events: uniqWith([
                ...(data.events || []),
                {
                  __type: 'Pointer',
                  className: 'EventDetail',
                  objectId: itemID
                }
              ], isEqual)
            })
          }
        );
      }
    })
    .then(() => browserHistory.push('/plans'))
    .catch(({ response: { data: { error } } }) => dispatch(planError(error)));
}

export function deletePlan(itemID) {
  return dispatch => apiRequest.delete('EventDetail', itemID)
    .then(() => dispatch(removePlan(itemID)))
    .then(() => browserHistory.push('/plans'));
}
