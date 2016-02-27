import { expect } from 'chai';
import sinon from 'sinon';

import channels from '../../src/reducers/channels.js';
import * as actions from '../../src/actions/channels.js';

describe('channels reducer', () => {
  it('should return a default state', () => {
    const previousState = undefined;
    const action = {type: '@@INIT'};
    const expected = { channelList:[], channelsLoading:true, selectedChannel:null };
    
    const nextState = channels(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });

  it('should set a channels list', () => {
    const previousState = undefined;
    const action = {
      type: actions.CHANNELS_GET,
      channelList: [ 
        { key: 'test1', name: 'test1', selected: false }, 
        { key: 'test2', name: 'test2', selected: false }
      ]
    };
    const expected = { 
      channelList: [ 
        { key: 'test1', name: 'test1', selected: false }, 
        { key: 'test2', name: 'test2', selected: false }
      ], 
      channelsLoading:false, 
      selectedChannel:null 
    };

    const nextState = channels(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });

  it('should select a channel', () => {
    const previousState = { 
      channelList: [ 
        { key: 'test1', name: 'test1', selected: false }, 
        { key: 'test2', name: 'test2', selected: false }
      ],
      channelsLoading:false, 
      selectedChannel:null 
    };
    const action = { 
      type: actions.CHANNEL_SELECTED, 
      selectedChannel: { key: 'test1', name: 'test1', selected: false } 
    };
    const expected = { 
      channelList: [ 
        { key: 'test1', name: 'test1', selected: true }, 
        { key: 'test2', name: 'test2', selected: false }
      ], 
      channelsLoading:false, 
      selectedChannel:  { key: 'test1', name: 'test1', selected: false }
    };

    const nextState = channels(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });
});