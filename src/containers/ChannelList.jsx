import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Card, List, CircularProgress } from 'material-ui';

import Channel from '../components/Channel.jsx';
import { openChannel, getChannels } from '../actions';

const mapStateToProps = (state) => {
  return {
    channelsLoading: state.chattee.channelsLoading,
    channels: state.chattee.channels
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
      let onListItemClick = (e) => {
        return openChannel(channel);
      }
      return (
        <Channel key={channel.key} channel={channel} onListItemClick={onListItemClick}/>
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

ChannelList = connect(mapStateToProps, mapDispatchToProps)(ChannelList);

export default ChannelList;
