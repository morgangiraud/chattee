import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from '../components/App.jsx';
import Chat from '../components/Chat.jsx';
import Login from '../components/Login.jsx';
import ChatStore from '../stores/ChatStore';

let routes = (
  <Route path="/" component={App}>
    <Route path="chat" component={Chat}>
      <Route path=":channel" component={Chat} />
    </Route>
    <IndexRoute component={Login} />
  </Route>
);

ReactDOM.render(
  <Router history={ hashHistory }>
    {routes}
  </Router>, document.getElementById('container')
);