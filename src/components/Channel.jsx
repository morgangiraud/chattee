import React from 'react';
import { ListItem } from 'material-ui';

const Channel = ({ channel, onListItemClick }) => {
  let style = {};

  if(channel.selected === true){
    style.background = '#f0f0f0';
  }

  return (
    <ListItem
      href={'#/chat/' + channel.key}
      style={style}
      onClick={onListItemClick}
    >
    {channel.name}
    </ListItem>
  );
}

export default Channel;
