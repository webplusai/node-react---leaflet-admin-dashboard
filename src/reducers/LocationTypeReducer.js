import { ADD_LOCATION_TYPES, ADD_LOCATION_TYPE, LOCATION_TYPE_ERROR, SHOW_LOCATION_TYPE, REMOVE_LOCATION_TYPE } from '../constants/LocationType';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function LocationTypeReducer(state = defaultState, { type, items, count, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_LOCATION_TYPES:
      return {
        ...state,
        items,
        count
      };

    case ADD_LOCATION_TYPE:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case LOCATION_TYPE_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_LOCATION_TYPE:
      return {
        ...state,
        item
      };

    case REMOVE_LOCATION_TYPE:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
