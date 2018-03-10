import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import $ from 'jquery';
import RegisterPage from './RegisterPage';

class RegisterPageContainer extends Component {
  state = {
    user: {
      name: '',
      email: '',
      city: '',
      phone: '',
    },
    errors: {
      name: '',
      email: '',
      city: '',
      phone: '',
    }
  }

  handleChange = (e) => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user});
  }

  handleSubmit = (e) => {
    console.log('form submitted');
  }


  render() {
    const {user, errors} = this.state;
    return(
      <RegisterPage handleChange={this.handleChange} user={user} errors={errors} handleSubmit={this.handleSubmit} />
    );
  }
}

RegisterPageContainer.propTypes = {
  // myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(actions, dipatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageContainer);
