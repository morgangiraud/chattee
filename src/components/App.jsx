import React from 'react';
import mui from 'material-ui';

var { 
  CircularProgress,
  AppBar
} = mui;

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
      <AppBar />
      { view }
    </div>
  );
}

export default App