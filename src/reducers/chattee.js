import * as actions from '../actions';

const chattee = (state = { appLoading: true, user: null }, action) => {
  switch(action.type){
    case actions.SESSION_CHECKED:
      if(action.exist){
        return {
          ...state,
          appLoading: false,
          user: action.user
        }
      } else {
        return {
          ...state,
          appLoading: false
        }
      }
    case actions.LOG_IN:
      return {
        ...state,
        user: action.user
      };
    case actions.LOG_OUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

export default chattee