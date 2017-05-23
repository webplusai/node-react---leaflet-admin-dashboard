import { ADD_EVENT_TYPES, ADD_EVENT_TYPE, EVENT_TYPE_ERROR, SHOW_EVENT_TYPE, REMOVE_EVENT_TYPE } from '../constants/EventType';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function EventTypeReducer(state = defaultState, { type, items, count, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_EVENT_TYPES:
      return {
        ...state,
        items,
        count
      };

    case ADD_EVENT_TYPE:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case EVENT_TYPE_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_EVENT_TYPE:
      return {
        ...state,
        item
      };

    case REMOVE_EVENT_TYPE:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
