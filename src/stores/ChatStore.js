import alt from '../alt';
import Actions from '../actions';
import utils from '../utils.js';
import {decorate, bind, datasource} from 'alt-utils/lib/decorators';
import ChannelSource from '../sources/ChannelSource'
import MessageSource from '../sources/MessageSource'
import SessionSource from '../sources/SessionSource'
import { hashHistory } from 'react-router'

import _ from 'lodash';

@datasource(ChannelSource, MessageSource, SessionSource)
@decorate(alt)
class ChatStore {
  constructor(){
    this.state = {
      user: null,
      messages: null,
      messagesLoading: true,
      appLoading: true
    };
  }

  @bind(Actions.channelsReceived)
  receivedChannels(channels){
    console.log('ChatStore.receivedChannels');
    let selectedChannel;
    _(channels)
      .keys()
      .forEach((key, index) => {
        channels[key].key = key;
        if(channels[key].selected){
          selectedChannel = channels[key];
        }
      });
    
    this.setState({
      channels,
      selectedChannel
    });

    setTimeout(this.getInstance().getMessages, 10);
  }

  @bind(Actions.channelOpened)
  openedChannel(selectedChannel){
    console.log('ChatStore.openedChannel');
    _(this.state.channels)
      .values()
      .forEach((channel) => {
        channel.selected = false;
      })

    selectedChannel.selected = true;

    this.setState({
      selectedChannel,
      channels: this.state.channels
    })

    setTimeout(this.getInstance().getMessages, 10);
  }

  @bind(Actions.messageReceived)
  receivedMessage(message){
    console.log('ChatStore.receivedMessage');
    if(this.state.messages[message.key]){
      return;
    }

    this.state.messages[message.key] = message;
    this.setState({
      messages: this.state.messages
    })
  }

  @bind(Actions.sendMessage)
  sendMessage(message){
    console.log('ChatStore.sendMessage');
    this.state.message = message;
    setTimeout(this.getInstance().sendMessage, 10);
  }

  @bind(Actions.messagesLoading)
  loadingMessage(){
    console.log('ChatStore.loadingMessage');
    this.setState({
      messagesLoading: true
    });
  }

  @bind(Actions.messagesReceived)
  receivedMessages(messages){
    console.log('ChatStore.receivedMessages');
    let selectedChannel;
    _(messages)
      .keys()
      .forEach((key) => {
        messages[key].key = key;
      });
    
    this.setState({
      messages,
      messagesLoading: false
    });
  }

  @bind(Actions.login)
  login(data){
    this.setState({
      user: data.user
    });
    utils.createCookie("react-session-id", JSON.stringify(data), 1);
  }

  @bind(Actions.sessionExistSuccess)
  sessionExistSuccess(data){
    console.log('ChatStore.sessionExistSuccess');
    if(data.sessionExist){
      this.setState({
        user: data.cookie.user,
        appLoading: false
      });
      hashHistory.push('/chat');
    } else {
      this.setState({
        user: null,
        appLoading: false
      });
      utils.eraseCookie("react-session-id");
      hashHistory.push('/');
    }
  }
}

export default alt.createStore(ChatStore);