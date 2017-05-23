import { ADD_PLANS, ADD_PLAN, PLAN_ERROR, SHOW_PLAN, REMOVE_PLAN } from '../constants/Plan';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function PlanReducer(state = defaultState, { type, items, count, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_PLANS:
      return {
        ...state,
        items,
        count
      };

    case ADD_PLAN:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case PLAN_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_PLAN:
      return {
        ...state,
        item
      };

    case REMOVE_PLAN:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
