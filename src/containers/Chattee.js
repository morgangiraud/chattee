import React from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';

import utils from '../utils.js';
import App from '../components/App.jsx';
import { checkSession } from '../actions';

const mapStateToProps = (state) => {
  return {
    appLoading: state.chattee.appLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkSession: () => {
      dispatch(checkSession());
    }
  };
}

class Chattee extends React.Component {
  componentDidMount() {
    this.props.checkSession();
  }

  render() {
    return (
        <App {...this.props} />
    )
  }
}

Chattee = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chattee);

export default Chattee;