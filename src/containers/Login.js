import React from 'react';
import mui from 'material-ui';
import { connect } from 'react-redux';

import { auth } from '../actions';

var { Card, CardText, RaisedButton } = mui;

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (provider) => {
      dispatch(auth(provider));
    }
  }
}

let Login = ({ auth }) => {
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
          'display': 'block',
          'margin': '10px'
        }} 
        onClick={() => auth('google')} 
        label="With Google!"
        primary={true}
      ></RaisedButton>
      <RaisedButton 
        style={{ 
          'display': 'block',
          'margin': '10px'
        }} 
        onClick={() => auth('twitter')} 
        label="With Twitter!"
        primary={true}
      ></RaisedButton>
    </Card>
  )
}

Login.propTypes = {
  auth: React.PropTypes.func
}

export default  connect(null, mapDispatchToProps)(Login);