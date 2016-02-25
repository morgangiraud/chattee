import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // Enable click/tap event for mui

require('./main.scss');
import routes from './routes';
import chattee from './reducers';
import rawTheme from './themes';

const router = routerMiddleware(hashHistory);

const rootReducer = combineReducers({
  chattee,
  routing: routerReducer
});
const initState = {
  chattee: {
    appLoading: true,
    user: null
  }
}
const middleWares = compose(
  applyMiddleware(
    thunk, // Allow async actions
    router // Allow to emits events to the router (redirect...)
  ), 
  (process.env.NODE_ENV !== 'production' && window.devToolsExtension) ? window.devToolsExtension() : f => f
);
let store = createStore(rootReducer, initState, middleWares);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(rawTheme)} >
      <Router history={history}>
        { routes }
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('container')
);