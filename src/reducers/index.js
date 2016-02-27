import * as actions from '../actions';
import message from './message.js';

const chattee = (state = {}, action) => {
  switch(action.type){
    case actions.SESSION_CHECKED:
      if(action.exist){
        return {
          ...state,
          appLoading: false,
          user: action.cookie.user
        }
      } else {
        return {
          ...state,
          appLoading: false,
        }
      }
      return state;
    case actions.ADD_USER:
      return {
        ...state,
        user: action.user
      };
    case actions.MESSAGES_GET:
      let messages = _.map(action.messages, (message, key) => {
        message.key = key;
        return message;
      })
      return {
        ...state,
        messages: messages
      };
    case actions.MESSAGE_RECEIVED:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      };
    case actions.UPDATE_MESSAGE:
    case actions.MESSAGE_SENT:
      return {
        ...state,
        message: message(state.message, action)
      }
    default:
      return state;
  }
}

export default chattee