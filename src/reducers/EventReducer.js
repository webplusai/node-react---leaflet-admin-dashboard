import { ADD_EVENTS, ADD_EVENT, EVENT_ERROR, SHOW_EVENT, REMOVE_EVENT } from '../constants/Event';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function EventReducer(state = defaultState, { type, items, count, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_EVENTS:
      return {
        ...state,
        items,
        count
      };

    case ADD_EVENT:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case EVENT_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_EVENT:
      return {
        ...state,
        item
      };

    case REMOVE_EVENT:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
