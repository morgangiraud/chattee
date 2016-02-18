import Actions from '../actions';
import Firebase from 'firebase';

let SessionSource = {
  sessionExist: {
    remote(state, cookie){
      console.log('SessionSource.sessionExist');
      return new Promise((resolve, reject)=> {
        if(cookie){
          cookie = JSON.parse(cookie);
          let sessionIdRef = new Firebase('https://amber-heat-1598.firebaseio.com/users_session/' + cookie.sessionId);        
          sessionIdRef.once("value", (snapshot) => {
            resolve({
              sessionExist:snapshot.exists(),
              cookie
            });
          })
        } else {
          resolve({
            sessionExist:false,
          });
        }
      });
    },
    success: Actions.sessionExistSuccess,
    error: Actions.sessionExistError
  }
}

export default SessionSource;