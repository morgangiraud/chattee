import React from 'react';
import Channel from './Channel.jsx';
import mui from 'material-ui';
import connectToStores from 'alt-utils/lib/connectToStores';
import ChatStore from '../stores/ChatStore';

var {Card, List, CircularProgress} = mui;

@connectToStores
class ChannelList extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){
      this.selectedChannel = _.has(this.props.params, "channel") ? this.props.params.channel : null;
      ChatStore.getChannels(this.selectedChannel);
    }

    componentWillReceiveProps(nextProps){
      if(_.has(nextProps, "channel") && this.selectedChannel != nextProps.channel){
        this.selectedChannel = nextProps.channel;
        ChatStore.getChannels(this.selectedChannel);
      }
    }

    static getStores(){
      return [ChatStore];
    }

    static getPropsFromStores(){
      return ChatStore.getState();
    }

    render() {
      if(!this.props.channels){
        return (
          <Card style={{
            flexGrow:1
          }}>
            <CircularProgress
              mode="indeterminate"
              style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                margin: '0 auto',
                display: 'block'
              }}
            ></CircularProgress>
          </Card>
        );
      }

        var channelNodes = _.map(this.props.channels, (channel) => {
            return (
              <Channel key={channel.key} channel={channel} />
            );
          });

        return (
          <Card style={{
            flexGrow: 1
          }}>
            <List>{channelNodes}</List>
          </Card>
        );
    }
}

export default ChannelList;

