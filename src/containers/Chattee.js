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
  dispatch(checkSession())
  return {};
}

const Chattee = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default Chattee;