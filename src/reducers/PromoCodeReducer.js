import { ADD_PROMO_CODES, ADD_PROMO_CODE, PROMO_CODE_ERROR, SHOW_PROMO_CODE, REMOVE_PROMO_CODE } from '../constants/PromoCode';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function PromoCodeReducer(state = defaultState, { type, items, count, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_PROMO_CODES:
      return {
        ...state,
        items,
        count
      };

    case ADD_PROMO_CODE:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case PROMO_CODE_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_PROMO_CODE:
      return {
        ...state,
        item
      };

    case REMOVE_PROMO_CODE:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
