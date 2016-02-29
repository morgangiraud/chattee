import React from 'react';
import { connect } from 'react-redux';

import App from '../components/App.js';
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

Chattee.propTypes = {
  checkSession: React.PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chattee);