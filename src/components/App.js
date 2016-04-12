import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import { CircularProgress, AppBar } from 'material-ui';
import ActionAllOut from 'material-ui/lib/svg-icons/action/all-out';

const App = ({
  appLoading,
  children,
  logout,
  user
}) => {
  let view = null;
  if(appLoading){
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
    view = children
  }

  return (
    <div>
      <AppBar 
        className="test-test"
        iconElementLeft={
          <IconButton style={{
            display: user ? '' : 'none'
          }}
          onTouchTap={logout}
          >
            <ActionAllOut />
          </IconButton>
        }
        title="Chattee! Chat happy!" 
        titleStyle={{
          'textAlign': 'center'
        }}
      />
      { view }
    </div>
  );
}

App.propTypes = {
  appLoading: React.PropTypes.bool,
  children: React.PropTypes.element,
  logout: React.PropTypes.func,
  user: React.PropTypes.object
}

export default App