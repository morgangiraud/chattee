import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Chattee from '../containers/Chattee.js';
import Login from '../containers/Login.jsx';
import Chat from '../components/Chat.jsx';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Chattee}>
      <Route path="chat" component={Chat}>
        <Route path=":channel" component={Chat} />
      </Route>
      <IndexRoute component={Login} />
    </Route>
  </Router>
);

export default routes