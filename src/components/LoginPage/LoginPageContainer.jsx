import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import LoginForm from './LoginForm';
class LoginPageContainer extends Component {
  state = {
    user: { email: '', password: ''},
    errors: { email: '', password: '' }
  }
  handleChange = (e) => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user});
  }
  handleSubmit = () => {
    console.log('user login submit');
  }
  render() {
    return(
      <div>
        <LoginForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} state={this.state} />
      </div>
    );
  }
}

LoginPageContainer.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
