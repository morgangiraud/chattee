import React from 'react';
import mui from 'material-ui';
import { connect } from 'react-redux';

import { login } from '../actions';

var { Card, CardText, RaisedButton } = mui;

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch(login());
    }
  }
}

let Login = ({ login }) => {
  return (
    <Card style={{
      'margin': '30px auto',
      'padding': '50px'
    }}>
      <CardText style={{
        'textAlign': 'center'
      }}>
        <h1>Log yourself in Bro!</h1>
      </CardText>
      <RaisedButton 
        style={{ 
          'display': 'block' 
        }} 
        onClick={login} 
        label="With Google!"
        primary={true}
      ></RaisedButton>
    </Card>
  )
}
Login = connect(null, mapDispatchToProps)(Login);

export default Login;
