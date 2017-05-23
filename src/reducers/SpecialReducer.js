import { ADD_SPECIALS, ADD_SPECIAL, SPECIAL_ERROR, SHOW_SPECIAL, REMOVE_SPECIAL } from '../constants/Special';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function SpecialReducer(state = defaultState, { type, items, count, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_SPECIALS:
      return {
        ...state,
        items,
        count
      };

    case ADD_SPECIAL:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case SPECIAL_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_SPECIAL:
      return {
        ...state,
        item
      };

    case REMOVE_SPECIAL:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
