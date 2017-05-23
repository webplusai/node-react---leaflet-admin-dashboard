import { ADD_PAYMENT_METHODS, ADD_PAYMENT_HISTORY, ADD_PAYMENT_METHOD, PAYMENT_METHOD_ERROR, SHOW_PAYMENT_METHOD, REMOVE_PAYMENT_METHOD } from '../constants/PaymentMethod';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function PaymentMethodReducer(state = defaultState, { type, items, count, has_more, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_PAYMENT_METHODS:
      return {
        ...state,
        items,
        count
      };

    case ADD_PAYMENT_HISTORY:
      return {
        ...state,
        items,
        has_more
      };

    case ADD_PAYMENT_METHOD:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case PAYMENT_METHOD_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_PAYMENT_METHOD:
      return {
        ...state,
        item
      };

    case REMOVE_PAYMENT_METHOD:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
