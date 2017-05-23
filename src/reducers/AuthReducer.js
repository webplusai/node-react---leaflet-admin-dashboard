import { AUTH_USER, UPDATE_CURRENT_USER, LOGOUT_USER, AUTH_ERROR } from '../constants/Auth';

const defaultState = {
  isAuthenticated: false,
  errorMessage: null,
  currentUser: {}
};

export default function AuthReducer(state = defaultState, { type, currentUser, errorMessage }) {
  switch (type) {
    case AUTH_USER:
      return { ...state, isAuthenticated: true, currentUser };
    case UPDATE_CURRENT_USER:
      return { ...state, currentUser };
    case LOGOUT_USER:
      return { ...state, isAuthenticated: false, errorMessage: null, currentUser: {} };
    case AUTH_ERROR:
      return { ...state, errorMessage, currentUser: {} };
    default:
      return state;
  }
}
