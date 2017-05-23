import { ADD_TAGS } from '../constants/Tag';

import { apiRequest } from '../utils';

export function addTags(items = []) {
  return {
    type: ADD_TAGS,
    items
  };
}

export function fetchTags({ search }) {
  const url = `EventTags?order=tag&limit=500${search ? `&where={"tag":{"$regex":"${search}"}}` : ''}`;

  return dispatch => apiRequest.get(url)
    .then(({ data: { results } }) => dispatch(addTags(results)));
}
