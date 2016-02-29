import React from 'react';
import { connect } from 'react-redux';

import App from '../components/App.js';
import { checkSession, logout } from '../actions';

const mapStateToProps = (state) => {
  return {
    appLoading: state.chattee.appLoading,
    user: state.chattee.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkSession: () => {
      dispatch(checkSession());
    },
    logout: () => {
      dispatch(logout());
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

Chattee.propTypes = {
  checkSession: React.PropTypes.func,
  logout: React.PropTypes.func,
  user: React.PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chattee);