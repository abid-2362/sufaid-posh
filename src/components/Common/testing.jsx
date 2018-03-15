import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class testing extends Component {
  state = {

  }

  render() {
    return(

    );
  }
}

testing.propTypes = {
  // myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(testing);
