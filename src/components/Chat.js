import React from 'react';
import MessageList from '../containers/MessageList.js';
import ChannelList from '../containers/ChannelList.js';
import MessageBox from '../containers/MessageBox.js';

const Chat = ({ channel }) => {
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

Chat.propTypes = {
  channel: React.PropTypes.object
}

export default Chat;
