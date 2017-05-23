import { ADD_BUNDLES, ADD_BUNDLE, BUNDLE_ERROR, SHOW_BUNDLE, REMOVE_BUNDLE } from '../constants/Bundle';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function BundleReducer(state = defaultState, { type, items, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_BUNDLES:
      return {
        ...state,
        items
      };

    case ADD_BUNDLE:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case BUNDLE_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_BUNDLE:
      return {
        ...state,
        item
      };

    case REMOVE_BUNDLE:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
