import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'

import chattee from './chattee.js';
import channels from './channels.js';
import messages from './messages.js';

const rootReducer = combineReducers({
  chattee,
  channels,
  messages,
  routing
})

export default rootReducer