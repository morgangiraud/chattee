import React from 'react';
import mui from 'material-ui';
import Actions from '../actions';

var {
  Card,
  CardText,
  RaisedButton
} = mui;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Login';
    }

    onClick(){
      Actions.login();
    }

    render() {
        return (
          <Card style={{
            'maxWidth': '800px',
            'margin': '30px auto',
            'padding': '50px'
          }}>
            <CardText style={{
              'textAlign': 'center'
            }}>To start chatting, log in!</CardText>
            <RaisedButton style={{
              'display': 'block'
            }} onClick={this.onClick.bind(this)} label="log in with Google"
            ></RaisedButton>
          </Card>
        )
    }
}

export default Login;
