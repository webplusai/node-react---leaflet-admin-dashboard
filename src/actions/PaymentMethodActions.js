import pickBy from 'lodash/pickBy';
import isNull from 'lodash/isNull';
import { browserHistory } from 'react-router';

import { ADD_PAYMENT_METHODS, ADD_PAYMENT_HISTORY, ADD_PAYMENT_METHOD, PAYMENT_METHOD_ERROR, SHOW_PAYMENT_METHOD, REMOVE_PAYMENT_METHOD } from '../constants/PaymentMethod';

import { apiRequest } from '../utils';

export function addPaymentMethods(items = [], count = 0) {
  return {
    type: ADD_PAYMENT_METHODS,
    items,
    count
  };
}

export function addPaymentHistory(items = [], has_more = false) {
  return {
    type: ADD_PAYMENT_HISTORY,
    items,
    has_more
  };
}

export function addPaymentMethod(item = {}) {
  return {
    type: ADD_PAYMENT_METHOD,
    item
  };
}

export function paymentMethodError(errorMessage) {
  return {
    type: PAYMENT_METHOD_ERROR,
    errorMessage
  };
}

export function showPaymentMethod(item = {}) {
  return {
    type: SHOW_PAYMENT_METHOD,
    item
  };
}

export function removePaymentMethod(itemId) {
  return {
    type: REMOVE_PAYMENT_METHOD,
    itemId
  };
}

export function fetchPaymentMethods({ search, include, order }, { is_admin, objectId }) {
  const user = is_admin ? {} : {
    __type: 'Pointer',
    className: 'Partner',
    objectId
  };

  const query = pickBy({
    $or: search ? [
        { name: { $regex: search, $options: 'i' } }
      ] : null,
    user: is_admin ? null : user
  }, v => !isNull(v));

  const url = [
    'PaymentMethod?count=1',
    order ? `&order=${order}` : null,
    include ? `&include=${include}` : null,
    `&where=${JSON.stringify(query)}`
  ].join('');

  return dispatch => apiRequest.get(url)
    .then(({ data: { results, count } }) => dispatch(addPaymentMethods(results, count)));
}

export function fetchPaymentHistory({ search, include, order }) {
  const accessToken = localStorage.getItem('token');
  return dispatch => apiRequest.stripeGet(accessToken, 'list')
    .then(({ data: { invoices: { data, has_more } } }) => dispatch(addPaymentHistory(data, has_more)));
}

export function fetchPaymentMethod(itemId) {
  return dispatch => apiRequest.get('PaymentMethod', itemId)
    .then(({ data }) => dispatch(showPaymentMethod(data)))
    .catch(() => browserHistory.push('/not-found'));
}

export function createPaymentMethod(paymentMethod, { objectId }) {
  const accessToken = localStorage.getItem('token');
  return dispatch => apiRequest.stripePost(accessToken, {
    ...paymentMethod,
    user: {
      __type: 'Pointer',
      className: 'Partner',
      objectId
    },
  })
    .then(() => browserHistory.push('/billing'))
    .catch(({ response: { data: { error } } }) => dispatch(paymentMethodError(error)));
}

export function updatePaymentMethod(itemID, paymentMethod) {
  return dispatch => apiRequest.put('PaymentMethod', itemID, paymentMethod)
    .then(() => browserHistory.push('/billing'))
    .catch(({ response: { data: { error } } }) => dispatch(paymentMethodError(error)));
}

export function deletePaymentMethod(itemID) {
  const accessToken = localStorage.getItem('token');
  return dispatch => apiRequest.stripeDelete(accessToken, itemID)
    .then(() => dispatch(removePaymentMethod(itemID)))
    .then(() => browserHistory.push('/billing'));
}
