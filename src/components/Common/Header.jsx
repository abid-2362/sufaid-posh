import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {withRouter, NavLink, Link} from 'react-router-dom';
// import RegisterPage from "../RegisterPage/RegisterPageContainer";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as loginActions from '../../actions/LoginActions';
import LoginPage from '../LoginPage/LoginPageContainer';
// import SelectRegisterType from '../RegisterPage/SelectRegisterType';
import $ from 'jquery';

class Header extends Component {
  state = {
    registerDialogOpen: false,
    loginDialogOpen: false,
    userId: '',
    authenticated: this.props.authenticated,
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.authenticated != this.state.authenticated) {
      let userId = nextProps.user.id;
      this.setState({authenticated: nextProps.authenticated, userId});
      this.handleLoginClose();
      this.props.history.push('/');
    }
  }

  handleLoginOpen = () => {
    this.setState({loginDialogOpen: true});
    setTimeout(() => {
      $('.registration-form').niceScroll();
    }, 50);
  };

  handleLoginClose = () => {
    $('.login-form').hide(); // avoids flashing the scroller at closing of dialog
    this.setState({loginDialogOpen: false});
  };

  handleLogout = () => {
    this.props.actions.logout();
  }

  componentDidMount() {

  }

  render() {

    const loginActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleLoginClose}
        key={1}
      />
    ];
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark pt-5">
          <div className="container header-content">
            <Link className="navbar-brand" to="/">
              <img className="logo" src={require('../../assets/img/logo-1.png')} alt="logo"/>
            </Link>
            <button
              className="navbar-toggler hidden-lg-up"
              type="button"
              data-toggle="collapse"
              data-target="#topNav"
              aria-controls="topNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="topNav">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink exact={true} className="nav-link" to="/">Home</NavLink>
                </li>

                {this.props.user.userType == "seeker" ?
                (
                  <li className="nav-item">
                    <NavLink exact={true} className="nav-link" to="/create-listing">Create Listing</NavLink>
                  </li>
                ) : null

                }

                {/* <li className="nav-item">
                  <NavLink exact={true} className="nav-link" to="/single-page">Single Page</NavLink>
                </li> */}
                {!this.state.authenticated ?
                (
                  <li className="nav-item">
                    {/* <a href="javascript:void(0)" className="nav-link" onClick={this.handleRegisterOpen}>Register</a> */}
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                  </li>
                )
                : null
                }
                {!this.state.authenticated ?
                (
                  <li className="nav-item">
                    <a href="javascript:void(0)" className="nav-link" onClick={this.handleLoginOpen}>Login</a>
                  </li>
                ) :
                (
                  <li className="nav-item">
                    <a href="javascript:void(0)" className="nav-link" onClick={this.handleLogout}>Logout</a>
                  </li>
                )
                }
              </ul>
            </div>
          </div>
        </nav>

        <div className="container header-content header-info">
          <h3>Sufaid Posh</h3>
        </div>

        <Dialog
          // title="Login Form"
          actions={loginActions}
          modal={false}
          open={this.state.loginDialogOpen}
          onRequestClose={this.handleLoginClose}
          autoScrollBodyContent={true}
          bodyClassName="login-form"
        >
          <LoginPage />
        </Dialog>
      </header>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.session.authenticated,
    user: state.session.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));