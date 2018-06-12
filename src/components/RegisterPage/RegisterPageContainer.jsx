import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import $ from 'jquery';
import RegisterPage from './RegisterPage';

class RegisterPageContainer extends Component {
  resetUser = () => {
    return { userRole: 'donor', username: '', email: '', password: '', name:'',  address:'', city: '', phone: '', cnicNumber: '', bankDetails: '', additionalInfo: '', public: false };
  }
  state = {
    user: this.resetUser(),
    errors: this.resetUser()
  }

  handleRoleRadioButton = (e, value) => {
    let user = this.state.user;
    user.userRole = value;
    this.setState({user});
  }


  render() {
    const {user, errors} = this.state;
    return(
      <RegisterPage handleRoleRadioButton={this.handleRoleRadioButton} user={user} errors={errors} />
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
