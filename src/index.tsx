import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import App from './containers/App';
import Detail from './containers/post/Detail';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, Middleware } from 'redux';
import rootReducer from './reducers/index';
import { StoreState } from './types/index';
import { createLogger } from 'redux-logger';

import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const history = createHistory();

const middleware: Middleware[] = [thunk, routerMiddleware(history)];

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const logger = createLogger({});
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const store = createStore<StoreState>(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact={true} path="/" component={App} />
        <Route path="/post/:subReddit/:postId" component={Detail} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
