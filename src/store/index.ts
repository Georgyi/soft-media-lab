import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: any) {
  return createStore(
    rootReducer(history),
    preloadedState,
    composeWithDevTools(
      compose(
        applyMiddleware(
          thunk,
          routerMiddleware(history),
        ),
      ),
    ),
  );
}
