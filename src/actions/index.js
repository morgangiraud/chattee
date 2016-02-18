import alt from '../alt';
import Firebase from 'firebase';
import { hashHistory } from 'react-router'

class Actions {
  constructor(){
    this.generateActions(
      'channelsReceived',
      'channelsFailed',
      'channelOpened',
      'messagesReceived',
      'messagesFailed',
      'messagesLoading',
      'sendMessage',
      'messageSendSuccess',
      'messageSendError',
      'messageReceived',
      'sessionExistSuccess',
      'sessionExistError'
    );
  }

  login(){
    return (dispatch) => {
      var firebaseRef = new Firebase('https://amber-heat-1598.firebaseio.com/');
      firebaseRef.authWithOAuthPopup('google', (err, user) => {
        if(err){
          return;
        }

        var usersSessionRef = new Firebase('https://amber-heat-1598.firebaseio.com/users_session');
        var sessionRef = usersSessionRef.push({
          date: new Date().toUTCString()
        });
        dispatch({
          user: user,
          sessionId: sessionRef.key()
        });

        hashHistory.push('/chat');
      });
    }
  }
}

export default alt.createActions(Actions);