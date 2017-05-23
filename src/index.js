import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import 'react-widgets/dist/css/react-widgets.css'
import './styles/main.css';

import App from './App';
import routes from './routes';
import configureStore from './store';

const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
const dest = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
    <App store={store} routes={routes} />
  </AppContainer>
, dest);

if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} routes={routes} />
      </AppContainer>,
      dest
    );
  });
}

if (process.env.NODE_ENV === 'development' && process.env.__DEVTOOLS__) {
  window.React = React; // enable debugger

  if (!window.devToolsExtension) {
    const DevTools = require('./components').DevTools; // eslint-disable-line global-require
    const devToolsDest = document.createElement('div');

    dest.parentNode.insertBefore(devToolsDest, dest.nextSibling);
    ReactDOM.render(
      <Provider store={store} key="provider">
        <DevTools />
      </Provider>,
      devToolsDest
    );
  }
}