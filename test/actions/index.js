import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { MockFirebase } from 'MockFirebase';

let mock;
let actions = proxyquire('../../src/actions', {
  firebase: (url) => {
    return (mock = new MockFirebase(url));
  }
})

describe('actions', () => {
  it('should fake login with google', () => {
    const asyncAuth = actions.auth('google');
    const stub = sinon.stub(mock, 'authWithOAuthPopup');
    const dispatch = sinon.spy();
    asyncAuth(dispatch); //Listening to the firebase mock

    // Call the callback of authWithOAuthPopup with the fake google api results
    stub.callArgWith(1, null, {
      auth: {
        uid: 'google:1234567890',
        provider: 'google'
      },
      google: {
        displayName: 'test',
        profileImageURL: 'https://fakeimage.com/test.png'
      }
    });

    // Call the callback of the firebase ref 'once' function
    mock.flush();
    
    expect(dispatch.called).to.be.true;
    expect(dispatch.calledWith({
        type: actions.LOG_IN,
        user: { 
          uid: 'google:1234567890',
          provider: 'google',
          displayName: 'test',
          profileImageURL: 'https://fakeimage.com/test.png' 
        }
      })).to.be.true;
  });
});