import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Card, List, CircularProgress } from 'material-ui';

import Channel from '../components/Channel.js';
import { openChannel, getChannels } from '../actions/channels.js';

const mapStateToProps = (state) => {
  return {
    channelsLoading: state.channels.channelsLoading,
    channels: state.channels.channelList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openChannel: (selectedChannel) => {
      dispatch(openChannel(selectedChannel));
    },
    getChannels: () => {
      dispatch(getChannels());
    }
  }
}

class ChannelList extends React.Component {
  componentDidMount() {
    this.props.getChannels();
  }

  render() {
    const { channelsLoading, channels, openChannel } = this.props;
    if(channelsLoading){
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

    var channelNodes = _.map(channels, (channel) => {
      let onListItemClick = () => {
        return openChannel(channel);
      }
      return (
        <Channel 
          key={channel.key} 
          channel={channel} 
          onListItemClick={onListItemClick}
        />
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

ChannelList.propTypes = {
  channelsLoading: React.PropTypes.bool,
  channels: React.PropTypes.array,
  openChannel: React.PropTypes.func,
  getChannels: React.PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);