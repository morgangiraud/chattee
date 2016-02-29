import React from 'react';
import { CircularProgress, AppBar } from 'material-ui';

const doingNothing = () => {
  console.log("Doing nothing for the lulz!");
}

const App = ({
  appLoading,
  children
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
        onLeftIconButtonTouchTap={doingNothing}
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
  children: React.PropTypes.element
}

export default App