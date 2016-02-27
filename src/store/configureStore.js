import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const router = routerMiddleware(hashHistory);
  let devTools = (f) => f;
  if(process.env.NODE_ENV !== 'production'){
    if(window.devToolsExtension){
      devTools = window.devToolsExtension();
    }
  }

  const middleWares = compose(
    applyMiddleware(
      thunk, // Allow async actions
      router // Allow to emits events to the router (redirect...)
    ), 
    devTools
  );
  const store = createStore(rootReducer, initialState, middleWares);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
