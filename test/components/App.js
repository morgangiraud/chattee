import { shallow } from 'enzyme';
import React from 'react';
import { CircularProgress, AppBar } from 'material-ui';
import { expect } from 'chai';

import App from '../../src/components/App.js';

describe('<App />', () => {
  it('should render one <CircularProgress /> and one <AppBar /> component', () => {
    const wrapper = shallow(<App appLoading={true}/>);
    expect(wrapper.find(CircularProgress)).to.have.length(1);
    expect(wrapper.find(AppBar)).to.have.length(1);
  });

  it('should render one <AppBar /> component', () => {
    const wrapper = shallow(<App appLoading={false}><h1>test</h1></App>);
    expect(wrapper.find(AppBar)).to.have.length(1);
    expect(wrapper.contains(<h1>test</h1>)).to.equal(true);
  });
});