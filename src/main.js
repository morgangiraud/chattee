require('./main.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import routes from './routes';

import mui from 'material-ui';

import chattee from './reducers';

const router = routerMiddleware(hashHistory)

const Colors = mui.Styles.Colors;
const muiTheme = mui.Styles.ThemeManager.getMuiTheme({
  primary1Color: Colors.blue500,
  primary2Color: Colors.blue700,
  primary3Color: Colors.blue100,
  accent1Color: Colors.pink400,
});

const rootReducer = combineReducers({
  chattee,
  routing: routerReducer
});
const initState = {
  chattee: {
    muiTheme,
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

ReactDOM.render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('container')
);