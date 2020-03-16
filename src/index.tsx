import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store/index';
import App from './components/app';

import './index.scss';

const store = configureStore();

const app: React.ReactElement = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
