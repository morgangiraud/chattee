import React from 'react';
import { connect } from 'react-redux';
import mui from 'material-ui';

import { updateMessage, sendMessage } from '../actions';

var {
  Card
} = mui;

const mapStateToProps = (state) => {
  return {
    message: state.messages.input
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (e) => {
      if(e.keyCode !== 13){
        dispatch(updateMessage(e.target.value));
      } 
    },
    onKeyUp: (e) => {
      var val = e.target.value.trim();
      if(e.keyCode === 13 &&  val != ''){
        e.preventDefault();
        dispatch(sendMessage(val));
      }
    }
  }
};

let MessageBox = ({
  message,
  onChange,
  onKeyUp
}) => {
  let input;
  return (
    <Card style={{
      maxWidth: 1200,
      margin: '30px auto',
      padding: 30
    }}>
      <textarea
        value={message}
        onChange={onChange}
        onKeyUp={onKeyUp}
        style={{
          width: '100%',
          borderColor: '#D0D0D0',
          resize:  'none',
          borderRadius: 3,
          minHeight: 50,
          color: '#555',
          fontSize: 14,
          outline: 'auto 0px'
        }}
      ></textarea>
    </Card>
  );
}
MessageBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);

export default MessageBox