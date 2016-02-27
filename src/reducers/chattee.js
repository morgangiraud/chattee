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
          appLoading: false,
        }
      }
      return state;
    case actions.ADD_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}

export default chattee