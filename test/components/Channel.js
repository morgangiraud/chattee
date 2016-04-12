import { shallow } from 'enzyme';
import React from 'react';
import { ListItem } from 'material-ui';
import { expect } from 'chai';
import sinon from 'sinon';

import Channel from '../../src/components/Channel.js';

describe('<Channel />', () => {
  it('simulates click events', () => {
    const onListItemClick = sinon.spy();
    const wrapper = shallow(
      <Channel channel={{ name:'test' }} onListItemClick={onListItemClick} />
    );
    wrapper.find('ListItem').simulate('click');
    expect(onListItemClick.calledOnce).to.equal(true);
  });
});