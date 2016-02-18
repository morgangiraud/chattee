import React from 'react';
import mui from 'material-ui';
import trim from 'trim';
import Actions from '../actions';

var {Card} = mui;

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'MessageBox';
        this.state = {
          message: ''
        }
    }

    onChange(evt) {
      this.setState({
        message: evt.target.value
      });
    }

    onKeyUp(evt) {
      var val = trim(evt.target.value);
      if(evt.keyCode === 13 && val != ''){
        evt.preventDefault();

        Actions.sendMessage(this.state.message);
        this.setState({
          message: ''
        });
      }
    }

    render() {
        return (
          <Card style={{
            maxWidth: 1200,
            margin: '30px auto',
            padding: 30
          }}>
            <textarea 
              value={this.state.message}
              onChange={this.onChange.bind(this)}
              onKeyUp={this.onKeyUp.bind(this)}
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
}

export default MessageBox;
