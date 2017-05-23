import { ADD_BOOSTS, ADD_BOOST, BOOST_ERROR, SHOW_BOOST, REMOVE_BOOST } from '../constants/Boost';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function BoostReducer(state = defaultState, { type, items, count, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_BOOSTS:
      return {
        ...state,
        items,
        count
      };

    case ADD_BOOST:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case BOOST_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_BOOST:
      return {
        ...state,
        item
      };

    case REMOVE_BOOST:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
