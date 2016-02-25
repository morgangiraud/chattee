import React from 'react';
import MessageList from '../containers/MessageList.jsx';
import ChannelList from '../containers/ChannelList.jsx';
import MessageBox from '../containers/MessageBox.jsx';

const Chat = (channel) => {
  return (
    <div>
      <div style={{
        display: 'flex',
        flexFlow:  'row wrap',
        maxWidth: 1200,
        width: '100%',
        margin: '30px auto 30px'
      }}>
        <ChannelList channel={channel} />
        <MessageList /> 
      </div>
      <MessageBox />
    </div> 
  );
}

export default Chat;
