import * as actions from '../actions';

const input = (state = '', action) => {
  switch(action.type){
    case actions.UPDATE_INPUT:
      return action.message;
    case actions.MESSAGE_SENT:
      return '';
    case actions.MESSAGE_NOT_SENT:
    default:
      return state;
  }
}

const messages = (
  state = { 
    messageList:[],
    loading: true ,
    input:'' 
  }, 
  action
) => {
  switch(action.type){
    case actions.MESSAGES_GET:
      return {
        ...state,
        loading: false,
        messageList: action.messages
      };
    case actions.MESSAGE_RECEIVED:
      return {
        ...state,
        messageList: state.messageList.concat(action.message)
      };
    case actions.UPDATE_INPUT:
    case actions.MESSAGE_SENT:
      return {
        ...state,
        input: input(state.input, action)
      }
    default:
      return state;
  }
}

export default messages