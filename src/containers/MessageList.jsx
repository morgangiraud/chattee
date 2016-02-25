import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Card, List, CircularProgress } from 'material-ui';

import Message from '../components/Message.jsx';

const mapStateToProps = (state) => {
  return {
    messagesLoading: state.chattee.messagesLoading,
    messages: state.chattee.messages
  }
}

let MessageList = ({
  messagesLoading,
  messages
}) => {
  let view = null;

  if(!messagesLoading){
    if(_.isEmpty(messages)){
      view = <div>No message Yet</div>
    } else {
      let messageNodes = _.map(messages, (message) => {
        return (
          <Message key={message.key} message={message} />
        );
      });
      view = <List>{messageNodes}</List>  
    }
  } else {
    view = <CircularProgress 
      mode="indeterminate" 
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        margin: '0 auto',
        display: 'block'
      }}
      />;
  }
  return (
    <Card style={{
      flexGrow: 2,
      marginLeft: '30px',
      maxHeight: '800px',
      overflowY: 'auto'
    }}>
      { view }
    </Card>
  );
}

MessageList = connect(mapStateToProps)(MessageList)

export default MessageList;
