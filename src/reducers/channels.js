import * as actions from '../actions/channels.js';
import _ from 'lodash';

const channels = (
  state = { 
    channelList:[], 
    channelsLoading:true, 
    selectedChannel:null 
  }, 
  action
) => {
  switch(action.type){
    case actions.CHANNELS_GET:
      return {
        ...state,
        channelsLoading: false,
        channelList: action.channelList
      };
    case actions.CHANNEL_SELECTED: {
      let channelList = _.map(state.channelList, (channel) => {
        if(channel.key === action.selectedChannel.key){
          return {
            ...channel,
            selected: true
          }
        }
        return {
          ...channel,
          selected: false
        }}
      );

      return {
        ...state,
        channelList,
        selectedChannel: action.selectedChannel
      };
    }
    default:
      return state;
  }
}

export default channels