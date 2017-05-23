import { ADD_USERS, ADD_USER, USER_ERROR, SHOW_USER, REMOVE_USER } from '../constants/User';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function UserReducer(state = defaultState, { type, items, count, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_USERS:
      return {
        ...state,
        items,
        count
      };

    case ADD_USER:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case USER_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_USER:
      return {
        ...state,
        item
      };

    case REMOVE_USER:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
