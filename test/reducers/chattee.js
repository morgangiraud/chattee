import { expect } from 'chai';

import chattee from '../../src/reducers/chattee.js';
import * as actions from '../../src/actions';

describe('chattee reducer', () => {
  it('should return a default state', () => {
    const previousState = undefined;
    const action = {type: '@@INIT'};
    const expected = { appLoading: true, user: null };
    
    const nextState = chattee(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });

  it('should set loading to false without a user', () => {
    const previousState = undefined;
    const action = {
      type: actions.SESSION_CHECKED,
      exist: false
    };
    const expected = { appLoading: false, user: null };

    const nextState = chattee(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });

  it('should set loading to false with a user', () => {
    const previousState = undefined;
    const action = {
      type: actions.SESSION_CHECKED,
      exist: true,
      user: { firstname: 'test' }
    };
    const expected = { appLoading: false, user: { firstname: 'test' } };

    const nextState = chattee(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });

  it('should add a user', () => {
    const previousState = { appLoading: false, user: null };
    const action = { 
      type: actions.LOG_IN, 
      user: { firstname: 'test' }
    };
    const expected = { appLoading: false, user: { firstname: 'test' } };

    const nextState = chattee(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });
});