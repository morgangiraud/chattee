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

Message.propTypes = {
  message: React.PropTypes.object
}

export default Message;
