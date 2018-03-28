import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/LoginActions';
import LoginForm from './LoginForm';
class LoginPageContainer extends Component {
  state = {
    user: { username: '', password: '' },
    errors: { username: '', password: '' },
  };
  handleChange = (e) => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };
  handleSubmit = () => {
    this.props.actions.loginUser(this.state.user);
  };
  render() {
    return (
      <div>
        <LoginForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} state={this.state} />
      </div>
    );
  }
}

LoginPageContainer.propTypes = {
  actions: PropTypes.object.isRequired

}

function mapStateToProps(state, ownProps) {
  return {
    // state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
