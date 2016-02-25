import * as actions from '../actions';

const message = (state = '', action) => {
  switch(action.type){
    case actions.UPDATE_MESSAGE:
      return action.message;
    case actions.MESSAGE_SENT:
      return '';
    case actions.MESSAGE_NOT_SENT:
    default:
      return state;
  }
}

export default message