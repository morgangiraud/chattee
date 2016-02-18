import React from 'react';
import mui from 'material-ui';
import Router from 'react-router';
import ChatStore from '../stores/ChatStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import Actions from '../actions';
import utils from '../utils.js';

var ThemeManager = mui.Styles.ThemeManager;
var Colors = mui.Styles.Colors;
var AppBar = mui.AppBar;

var rawTheme = {
  primary1Color: Colors.blue500,
  primary2Color: Colors.blue700,
  primary3Color: Colors.blue100,
  accent1Color: Colors.pink400,
}

var {CircularProgress} = mui;

@connectToStores
class App extends React.Component {
    constructor(props) {
      super(props);
      let cookie = utils.readCookie("react-session-id");
      ChatStore.sessionExist(cookie);
    }

    static childContextTypes = {
      muiTheme: React.PropTypes.object
    }

    getChildContext(){
      return {
        muiTheme: ThemeManager.getMuiTheme(rawTheme)
      }
    }

    static getStores(){
      return [ChatStore];
    }

    static getPropsFromStores(){
      return ChatStore.getState();
    }

    render() {
        let state = ChatStore.getState();
        let view = null;
        if(state.appLoading){
          view = (
            <CircularProgress
              mode="indeterminate"
              style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                margin: '0 auto',
                display: 'block'
              }}
            ></CircularProgress>
          );
        } else {
          view = this.props.children;
        }
        return (
          <div>
            <AppBar title="Awesone Chat" />
            { view }
          </div>
        );
    } 
}

export default App;
