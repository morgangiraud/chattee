import { expect } from 'chai';

import messages from '../../src/reducers/messages.js';
import * as actions from '../../src/actions';

describe('messages reducer', () => {
  it('should return a default state', () => {
    const previousState = undefined;
    const action = {type: '@@INIT'};
    const expected = { messageList:[], loading: true, input:"" };
    
    const nextState = messages(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });

  it('should set a message list', () => {
    const previousState = undefined;
    const action = {
      type: actions.MESSAGES_GET,
      messages: [ 
        { key: 'test1', message: 'test1' }, 
        { key: 'test2', message: 'test2' }
      ]
    };
    const expected = { 
      messageList: [ 
        { key: 'test1', message: 'test1' }, 
        { key: 'test2', message: 'test2' }
      ], 
      loading: false,
      input: ''
    };

    const nextState = messages(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });

  it('should add a message to the messageList', () => {
    const previousState = { 
      messageList: [ 
        { key: 'test1', message: 'test1' }, 
        { key: 'test2', message: 'test2' }
      ], 
      loading: false,
      input: ''
    };
    const action = { 
      type: actions.MESSAGE_RECEIVED, 
      message: { key: 'test3', message: 'test3' } 
    };
    const expected = { 
      messageList: [ 
        { key: 'test1', message: 'test1' }, 
        { key: 'test2', message: 'test2' },
        { key: 'test3', message: 'test3' }
      ],
      loading: false,
      input: ''
    };

    const nextState = messages(previousState, action);
    expect(nextState).to.deep.equal(expected);
  });
});