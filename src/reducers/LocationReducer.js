import { ADD_LOCATIONS, ADD_LOCATION, LOCATION_ERROR, SHOW_LOCATION, REMOVE_LOCATION } from '../constants/Location';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function LocationReducer(state = defaultState, { type, items, count, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_LOCATIONS:
      return {
        ...state,
        items,
        count
      };

    case ADD_LOCATION:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case LOCATION_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_LOCATION:
      return {
        ...state,
        item
      };

    case REMOVE_LOCATION:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
