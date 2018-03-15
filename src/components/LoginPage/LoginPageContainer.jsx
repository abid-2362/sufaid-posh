import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/LoginActions';
import LoginForm from './LoginForm';
class LoginPageContainer extends Component {
  state = {
    user: { email: '', password: '', cnicNumber: '' },
    errors: { email: '', password: '', cnicNumber: '' },
    tab: 'donor'
  };
  handleChange = (e) => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };
  handleSubmit = (userType) => {
    console.log('user login submit');
    if(userType.toLowerCase() == "donor"){
      this.props.actions.loginDonor(this.state.user);
    }else if(userType.toLowerCase() == "user"){
      this.props.actions.loginUser(this.state.user);
    }
  };
  formSelector = (currentTab) => {
    this.setState({
      tab: currentTab,
    });
  };
  render() {
    return (
      <div>
        <LoginForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} state={this.state} formSelector={this.formSelector} />
      </div>
    );
  }
}

LoginPageContainer.propTypes = {
  actions: PropTypes.object.isRequired

}

function mapStateToProps(state, ownProps) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
