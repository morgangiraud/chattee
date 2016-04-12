import React from 'react';
import { Route, IndexRoute } from 'react-router'

import Chattee from '../containers/Chattee.js';
import Login from '../containers/Login.js';
import Chat from '../components/Chat.js';

const routes = (
  <Route path="/" component={Chattee}>
    <Route path="chat" component={Chat}>
      <Route path=":channel" component={Chat} />
    </Route>
    <IndexRoute component={Login} />
  </Route>
);

export default routes