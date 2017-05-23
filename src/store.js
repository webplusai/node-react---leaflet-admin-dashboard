import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import * as rootReducer from './reducers';

export default function configureStore(initialState = {}) {
  let finalCreateStore;

  if (process.env.NODE_ENV === 'development' && process.env.__CLIENT__) {
    // const createLogger = require('redux-logger'); // eslint-disable-line global-require
    const { persistState } = require('redux-devtools'); // eslint-disable-line global-require

    const { DevTools } = require('./components'); // eslint-disable-line global-require

    finalCreateStore = compose(
      applyMiddleware(thunk), // , createLogger({ diff: true })
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(thunk)(createStore);
  }

  const store = finalCreateStore(combineReducers({
    ...rootReducer
  }), initialState);

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers'); // eslint-disable-line global-require
      store.replaceReducer(combineReducers({
        ...nextReducer
      }));
    });
  }

  return store;
}
