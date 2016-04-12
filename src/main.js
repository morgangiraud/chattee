import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // Enable click/tap event for mui

require('./main.scss');
import configureStore from './store/configureStore.js';
import routes from './routes';
import muiTheme from './themes';

const initialState = {
  chattee: {
    appLoading: true,
    user: null
  }
}
let store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme} >
      <Router history={history}>
        { routes }
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('container')
);