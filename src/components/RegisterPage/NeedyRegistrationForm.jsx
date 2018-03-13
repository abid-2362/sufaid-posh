import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class DonorRegistrationForm extends Component {
  state = {
    user: {},
    error: {}
  }

  render() {
    return(
      <section>
        <h2>Needy Registration Form</h2>
      </section>
    );
  }
}

DonorRegistrationForm.propTypes = {
  // myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dipatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DonorRegistrationForm);
