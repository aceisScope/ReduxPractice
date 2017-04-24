import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Home from './Home';

class AppContainer extends Component {

  addRecipe() {
    this.props.addRecipe();
  }

  render() {
    // pass this.props to Home, so Home has access to all the ActionCreators
    return <Home {...this.props} />
  }

}

// match dispatched actions with props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {}
}, mapDispatchToProps)(AppContainer);
