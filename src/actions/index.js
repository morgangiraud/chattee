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
  return {
    type: SESSION_CHECKED,
    exist,
    cookie
  }
}

export const getMessages = () => {
  return (dispatch) => {
    fChannelRef.once("value", (dataSnapshot)=> {
      let messages = dataSnapshot.val();
      let lastKey = _.last(_.keys(messages));
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
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const updateMessage = (message) => {
  return {
    type: UPDATE_MESSAGE,
    message
  }
}

export const sendMessage = (message) => {
  return (dispatch, getState) => {
    if(!fChannelRef){
      return dispatch(messageNotSent());
    }

    const chattee = getState().chattee;
    fChannelRef.push({
      message: chattee.message,
      date: new Date().toUTCString(),
      author: chattee.user.google.displayName,
      userId: chattee.user.uid,
      profilePic: chattee.user.google.profileImageURL
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


// ----------------------------
// Channel actions
// ----------------------------
export const getChannels = () => {
  return (dispatch, getState) => {
    let fChannelsRef = new Firebase('https://amber-heat-1598.firebaseio.com/channels');
    fChannelsRef.once("value", (dataSnapshot)=> {
      let channels = dataSnapshot.val();
      const chattee = getState().chattee;
      
      const selectedChannelKey = (_.has(chattee, 'selectedChannel') ? chattee.selectedChannel.key : undefined) || _.keys(channels)[0];
      let selectedChannel = channels[selectedChannelKey];
      if(selectedChannel){
        channels = _.mapValues(channels, (channel, key)=>{
          channel.key = key;
          if(channel === selectedChannel){
            channel.selected = true;
          } else {
            channel.selected = false;
          }
          return channel;
        });
      }
      dispatch(channelsGet(channels));
      dispatch(openChannel(selectedChannel))
    });
    return;
  }
}
export const CHANNELS_GET = 'CHANNELS_GET';
export const channelsGet = (channels) => {
  return {
    type: CHANNELS_GET,
    channels
  }
}

let fChannelRef = null
export const openChannel = (selectedChannel) => {
  return (dispatch) => {
    if(fChannelRef){
      fChannelRef.off();
    }
    fChannelRef = new Firebase('https://amber-heat-1598.firebaseio.com/messages/' + selectedChannel.key);

    dispatch(channelSelected(selectedChannel));
    dispatch(getMessages());
  }
}
export const CHANNEL_SELECTED = 'CHANNEL_SELECTED';
export const channelSelected = (selectedChannel) => {
  return {
    type: CHANNEL_SELECTED,
    selectedChannel
  }
}