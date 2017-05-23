import { ADD_TAGS } from '../constants/Tag';

const defaultState = {
  items: []
};

export default function TagReducer(state = defaultState, { type, items }) {
  switch (type) {
    case ADD_TAGS:
      return {
        ...state,
        items
      };

    default:
      return state;
  }
}
