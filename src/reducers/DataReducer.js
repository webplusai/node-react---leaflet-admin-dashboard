import { ADD_DATA } from '../constants/Data';

const defaultState = {
  item: {}
};

export default function DataReducer(state = defaultState, { type, item }) {
  switch (type) {
    case ADD_DATA:
      return {
        ...state,
        item
      };

    default:
      return state;
  }
}
