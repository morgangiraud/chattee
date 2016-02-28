import Firebase from 'firebase';
import { push } from 'react-router-redux'

import utils from '../utils'

export const login = () => {
  return (dispatch) => {
    let firebaseRef = new Firebase('https://amber-heat-1598.firebaseio.com/');
    firebaseRef.authWithOAuthPopup('google', (err, user) => {
      if(err){
        dispatch(loginFailed());
        return;
      }

      let usersSessionRef = new Firebase('https://amber-heat-1598.firebaseio.com/users_session');
      let sessionRef = usersSessionRef.push({
        date: new Date().toUTCString()
      });

      let sessionId = sessionRef.key();
      let cookie = {
        user,
        sessionId
      };
      utils.createCookie("react-session-id", JSON.stringify(cookie), 1);

      dispatch(addUser(user, sessionId));
      setTimeout(() => {
        dispatch(push('/chat'));
      }, 0);
    });
  }
}

export const ADD_USER = 'ADD_USER';
export const addUser = (user) => {
  return {
    type: ADD_USER,
    user
  };
}

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const loginFailed = () => {
  return {
    type: LOGIN_FAILED,
  };
}

export const checkSession = () => {
  return (dispatch) => {
    let cookie = utils.readCookie("react-session-id");
    if(cookie){
      cookie = JSON.parse(cookie);
      let sessionIdRef = new Firebase('https://amber-heat-1598.firebaseio.com/users_session/' + cookie.sessionId);        
      sessionIdRef.once("value", (snapshot) => {
        let exist = snapshot.exists();
        dispatch(sessionChecked(exist, cookie));
        if(exist){
          setTimeout(() => {
            dispatch(push('/chat'));
          }, 0);     
        } else {
          setTimeout(() => {
            dispatch(push('/'));
          }, 0);
        }
      })
    } else {
      utils.eraseCookie("react-session-id");
      dispatch(sessionChecked());
      setTimeout(() => {
        dispatch(push('/'));
      }, 0);
    }
  }
}

export const SESSION_CHECKED = 'SESSION_CHECKED';
export const sessionChecked = (exist, cookie) => {
  const user = (cookie === undefined) ? undefined : cookie.user
  return {
    type: SESSION_CHECKED,
    exist,
    user: user
  }
}

let fChannelRef = null
export const getMessages = () => {
  return (dispatch, getState) => {
    const selectedChannel = getState().channels.selectedChannel;
    if(!selectedChannel){
      return;
    }

    if(fChannelRef){
      if(fChannelRef.toString() != 'https://amber-heat-1598.firebaseio.com/messages/' + selectedChannel.key){
        fChannelRef.off();
        fChannelRef = new Firebase('https://amber-heat-1598.firebaseio.com/messages/' + selectedChannel.key);
      }
    } else {
      fChannelRef = new Firebase('https://amber-heat-1598.firebaseio.com/messages/' + selectedChannel.key);
    }

    fChannelRef.once("value", (dataSnapshot)=> {
      let messages = dataSnapshot.val();
      let lastKey = _.last(_.keys(messages));
      messages = _.map(messages, (message, key) => {
        message.key = key;
        return message;
      });
      dispatch(messagesGet(messages));

      fChannelRef.orderByKey().startAt(lastKey).on('child_added', (msg) => {
        if( msg.key() === lastKey ) { 
          return; 
        }
        let message = msg.val();
        message.key = msg.key();
        dispatch(messageReceived(message));
      })
    });
    return;
  }
}
export const MESSAGES_GET = 'MESSAGES_GET';
export const messagesGet = (messages) => {
  return {
    type: MESSAGES_GET,
    messages
  }
}

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const messageReceived = (message) => {
  return {
    type: MESSAGE_RECEIVED,
    message
  }
}
export const UPDATE_INPUT = 'UPDATE_INPUT';
export const updateMessage = (message) => {
  return {
    type: UPDATE_INPUT,
    message
  }
}

export const sendMessage = (message) => {
  return (dispatch, getState) => {
    if(!fChannelRef){
      return dispatch(messageNotSent());
    }

    const state = getState();
    fChannelRef.push({
      message: state.messages.input,
      date: new Date().toUTCString(),
      author: state.chattee.user.google.displayName,
      userId: state.chattee.user.uid,
      profilePic: state.chattee.user.google.profileImageURL
    })
    dispatch(messageSent());
  };
}

export const MESSAGE_SENT = 'MESSAGE_SENT';
export const messageSent = () => {
  return {
    type: MESSAGE_SENT,
  }
}

export const MESSAGE_NOT_SENT = 'MESSAGE_NOT_SENT';
export const messageNotSent = () => {
  return {
    type: MESSAGE_NOT_SENT,
  }
}