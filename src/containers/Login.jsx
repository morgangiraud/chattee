import React from 'react';
import mui from 'material-ui';
import { connect } from 'react-redux';

import { login } from '../actions';

var {
  Card,
  CardText,
  RaisedButton
} = mui;

let Login = ({ dispatch }) => {
  return (
    <Card style={{
      'maxWidth': '800px',
      'margin': '30px auto',
      'padding': '50px'
    }}>
      <CardText style={{
        'textAlign': 'center'
      }}>
        To start chatting, log in!
      </CardText>
      <RaisedButton 
        style={{ 'display': 'block' }} 
        onClick={ () => {
          dispatch(login());
        }} 
        label="log in with Google"
      ></RaisedButton>
    </Card>
  )
}
Login = connect()(Login);

export default Login;
