import { browserHistory } from 'react-router';

import { ADD_PROMO_CODES, ADD_PROMO_CODE, PROMO_CODE_ERROR, SHOW_PROMO_CODE, REMOVE_PROMO_CODE } from '../constants/PromoCode';

import { apiRequest } from '../utils';

export function addPromoCodes(items = [], count = 0) {
  return {
    type: ADD_PROMO_CODES,
    items,
    count
  };
}

export function addPromoCode(item = {}) {
  return {
    type: ADD_PROMO_CODE,
    item
  };
}

export function promoCodeError(errorMessage) {
  return {
    type: PROMO_CODE_ERROR,
    errorMessage
  };
}

export function showPromoCode(item = {}) {
  return {
    type: SHOW_PROMO_CODE,
    item
  };
}

export function removePromoCode(itemId) {
  return {
    type: REMOVE_PROMO_CODE,
    itemId
  };
}

export function fetchPromoCodes({ search, include, order }) {
  const url = [
    'PromoCode?count=1',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    search ? `&where=${JSON.stringify({
        $or: [
          { name: { $regex: search, $options: 'i' } }
        ]
      })}` : null
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addPromoCodes(results, count)));
}

export function fetchPromoCode(itemId) {
  return dispatch => apiRequest.get('PromoCode', itemId, '?include="location_types"')
    .then(({ data }) => dispatch(showPromoCode(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createPromoCode(promoCode) {
  return dispatch => apiRequest.post('PromoCode', {
    ...promoCode,
    location_types: (promoCode.location_types || []).map(location_type => ({
      __type: 'Pointer',
      className: 'LocationType',
      objectId: location_type.objectId
    }))
  })
    .then(() => browserHistory.push('/promoCodes'))
    .catch(({ response: { data: { error } } }) => dispatch(promoCodeError(error)));
}

export function updatePromoCode(itemID, promoCode) {
  return dispatch => apiRequest.put('PromoCode', itemID, {
    ...promoCode,
    location_types: (promoCode.location_types || []).map(location_type => ({
      __type: 'Pointer',
      className: 'LocationType',
      objectId: location_type.objectId
    }))
  })
    .then(() => browserHistory.push('/promoCodes'))
    .catch(({ response: { data: { error } } }) => dispatch(promoCodeError(error)));
}

export function deletePromoCode(itemID) {
  return dispatch => apiRequest.delete('PromoCode', itemID)
    .then(() => dispatch(removePromoCode(itemID)))
    .then(() => browserHistory.push('/promoCodes'));
}
