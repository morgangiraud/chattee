import Firebase from 'firebase';
import { push } from 'react-router-redux'
import _ from 'lodash';

let mainRef = new Firebase('https://amber-heat-1598.firebaseio.com/');

const getUserFromAuthData = (authData) => {
  let user = {
    uid: authData.auth.uid,
    provider: authData.auth.provider
  };
  if(authData.auth.provider === 'google'){
    _.assign(user, {
      displayName: authData.google.displayName,
      profileImageURL: authData.google.profileImageURL
    });
  } else if(authData.auth.provider === 'twitter'){
    _.assign(user, {
      displayName: authData.twitter.displayName,
      profileImageURL: authData.twitter.profileImageURL
    });
  }

  return user;
}

export const auth = (provider) => {
  return (dispatch) => {
    mainRef.authWithOAuthPopup(provider, (err, authData) => {
      if(err || !authData){
        dispatch(loginFailed());
        return;
      }

      const user = getUserFromAuthData(authData);
      const userRef = mainRef.child("users").child(user.uid);
      userRef.once("value", (dataSnapshot) => {
        if(!dataSnapshot.val()){
          userRef.set(user); 
        }

        dispatch(login(user));
        setTimeout(() => {
          dispatch(push('/chat'));
        }, 0);
      });
    });
  }
}

export const LOG_OUT = 'LOG_OUT';
export const logout = () => {
  return (dispatch) => {
    mainRef.unauth();
    dispatch({type: LOG_OUT});
    setTimeout(() => {
      dispatch(push('/'));
    }, 0)
  }
}

export const LOG_IN = 'LOG_IN';
export const login = (user) => {
  return {
    type: LOG_IN,
    user
  };
}

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const loginFailed = () => {
  return {
    type: LOGIN_FAILED
  };
}

export const checkSession = () => {
  return (dispatch) => {
    const authData = mainRef.getAuth();
    if(authData){
      const user = getUserFromAuthData(authData);
      dispatch(sessionChecked(true, user));
      setTimeout(() => {
        dispatch(push('/chat'));
      }, 0);     
    } else {
      dispatch(sessionChecked());
      setTimeout(() => {
        dispatch(push('/'));
      }, 0);
    }
  }
}

export const SESSION_CHECKED = 'SESSION_CHECKED';
export const sessionChecked = (exist, user) => {
  return {
    type: SESSION_CHECKED,
    exist,
    user
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
      message,
      date: new Date().toUTCString(),
      author: state.chattee.user.displayName,
      userId: state.chattee.user.uid,
      profilePic: state.chattee.user.profileImageURL
    })
    dispatch(messageSent());
  };
}

export const MESSAGE_SENT = 'MESSAGE_SENT';
export const messageSent = () => {
  return {
    type: MESSAGE_SENT
  }
}

export const MESSAGE_NOT_SENT = 'MESSAGE_NOT_SENT';
export const messageNotSent = () => {
  return {
    type: MESSAGE_NOT_SENT
  }
}