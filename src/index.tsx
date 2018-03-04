import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import App from './containers/App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, Middleware } from 'redux';
import rootReducer from './reducers/index';
import { StoreState } from './types/index';
import { createLogger } from 'redux-logger';

const middleware: Middleware[] = [thunk];

const logger = createLogger({});
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const store = createStore<StoreState>(
  rootReducer,
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
