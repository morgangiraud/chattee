import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { MockFirebase } from 'MockFirebase';

let mock;
let actions = proxyquire('../../src/actions/channels.js', {
  firebase: (url) => {
    return (mock = new MockFirebase(url));
  }
})

describe('channels actions', () => {
  it('should get all channels', () => {
    const asyncAction = actions.getChannels();
    mock.child('explee').set({ name: 'explee' });
    mock.child('project').set({ name: 'project' });
    mock.flush();
    const dispatch = sinon.spy();
    const getState = sinon.stub.returns({
      channels: {
        channelList: [],
        selectedChannel: null
      }
    });
    asyncAction(dispatch, getState); //Listening to the firebase mock
    mock.flush();
    
    expect(dispatch.calledTwice).to.be.true;
    expect(dispatch.calledWith({
        type: actions.CHANNELS_GET,
        channelList: [ 
          { name: 'explee', key: 'explee', selected: true },
          { name: 'project', key: 'project', selected: false } 
        ]
      })).to.be.true;
  });
});