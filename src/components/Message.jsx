import React from 'react';
import { ListItem, Avatar } from 'material-ui';

const Message = ( { message } ) => {
  return (
    <ListItem
    leftAvatar={<Avatar src={ message.profilePic } />}
    style={{
      maxWidth: 500
    }}
    >{ message.message }</ListItem>
  );
}

export default Message;
