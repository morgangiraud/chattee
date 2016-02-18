import React from 'react';
import MessageList from './MessageList.jsx';
import ChannelList from './ChannelList.jsx';
import MessageBox from './MessageBox.jsx';

class Chat extends React.Component {
    constructor(props) {
      console.log("ChatConstructor");
      super(props);
    }
    render() {
      return (
        <div>
          <div style={{
            display: 'flex',
            flexFlow:  'row wrap',
            maxWidth: 1200,
            width: '100%',
            margin: '30px auto 30px'
          }}>
            <ChannelList channel={this.props.params.channel} />
            <MessageList />
          </div>
          <MessageBox />
        </div> 
      );
    }
}

export default Chat;
