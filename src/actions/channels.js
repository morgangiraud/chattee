import Firebase from 'firebase';
import _ from 'lodash';
import { getMessages } from './index.js';

export const getChannels = () => {
  return (dispatch, getState) => {
    let channelsRef = new Firebase('https://amber-heat-1598.firebaseio.com/channels');
    channelsRef.once("value", (dataSnapshot)=> {
      let channels = dataSnapshot.val();
      const state = getState();
      
      const selectedChannelKey = ( (_.has(state.channels, 'selectedChannel') && _.isObject(state.channels.selectedChannel)) ? state.channels.selectedChannel.key : undefined) || _.keys(channels)[0];
      let selectedChannel = channels[selectedChannelKey];
      if(selectedChannel){
        channels = _.map(channels, (channel, key) => {
          channel.key = key;
          if(channel === selectedChannel){
            channel.selected = true;
          } else {
            channel.selected = false;
          }
          return channel;
        });
      }
      dispatch(channelsGet(channels));
      dispatch(openChannel(selectedChannel))
    });
    return;
  }
}
export const CHANNELS_GET = 'CHANNELS_GET';
export const channelsGet = (channels) => {
  return {
    type: CHANNELS_GET,
    channelList: channels
  }
}

export const openChannel = (selectedChannel) => {
  return (dispatch) => {
    dispatch(channelSelected(selectedChannel));
    dispatch(getMessages());
  }
}
export const CHANNEL_SELECTED = 'CHANNEL_SELECTED';
export const channelSelected = (selectedChannel) => {
  return {
    type: CHANNEL_SELECTED,
    selectedChannel
  }
}