import React from 'react';
import Message from './Message.jsx';
import mui from 'material-ui';
import Firebase from 'firebase';
import _ from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';
import ChatStore from '../stores/ChatStore';

var {Card, List, CircularProgress} = mui;

@connectToStores
class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'MessageList';
    }

    static getStores(){
      return [ChatStore];
    }

    static getPropsFromStores(){
      return ChatStore.getState();
    }

    render() {
        let view = null;

        if(!this.props.messagesLoading){
          if(_.isEmpty(this.props.messages)){
            view = <div>No message Yet</div>
          } else {
            let messageNodes = _.map(this.props.messages, (message) => {
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
            marginLeft: '30px'
          }}>
            { view }
          </Card>
        );
    }
}

export default MessageList;

