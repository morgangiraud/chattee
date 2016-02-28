import { shallow, mount } from 'enzyme';

import React from 'react';
import { Router, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore, push } from 'react-router-redux'
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // Enable click/tap event for mui

import configureStore from '../../../src/store/configureStore.js';
import routes from '../../../src/routes';
import muiTheme from '../../../src/themes';

let World = module.exports = function(){
  const initialState = {
    chattee: {
      appLoading: true,
      user: null
    }
  }
  let store = configureStore(initialState);
  const history = syncHistoryWithStore(createMemoryHistory(), store);

  this.wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme} >
        <Router history={history}>
          { routes }
        </Router>
      </MuiThemeProvider>
    </Provider>
  );

  this.visit = function(path, callback){
    store.dispatch(push(path));
  };
};