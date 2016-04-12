import { shallow, mount } from 'enzyme';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { ListItem } from 'material-ui';
import { expect } from 'chai';
import sinon from 'sinon';

import chattee from '../../src/reducers';
import channels from '../../src/reducers/channels.js';
import ChannelList from '../../src/containers/ChannelList.js';

describe('<ChannelList />', () => {
  it('calls componentDidMount', () => {
    sinon.stub(ChannelList.WrappedComponent.prototype, 'componentDidMount');
    const wrapper = mount(<ChannelList />, {
      context: {
        store: createStore(combineReducers({ chattee, channels }))
      }
    });
    expect(ChannelList.WrappedComponent.prototype.componentDidMount.calledOnce).to.be.true;
    // ChannelList.prototype.componentDidMount.restore();
  });
});