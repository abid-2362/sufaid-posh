import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {NavLink, Link} from 'react-router-dom';
import RegisterPage from "../RegisterPage/RegisterPageContainer";
import LoginPage from '../LoginPage/LoginPageContainer';
import $ from 'jquery';
class Header extends Component {
  state = {
    registerDialogOpen: false,
    loginDialogOpen: false
  };

  handleRegisterOpen = () => {
    this.setState({registerDialogOpen: true});
    setTimeout(() => {
      $('.registration-form').niceScroll();
    }, 50);
  };

  handleRegisterClose = () => {
    $('.registration-form').hide(); // avoids flashing the scroller at closing of dialog
    this.setState({registerDialogOpen: false});
  };

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

  componentDidMount() {

  }


  render() {
    const registerActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleRegisterClose}
        key={1}
      />
    ];
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

                <li className="nav-item">
                  <NavLink className="nav-link" to="/single-page">Single Page</NavLink>
                </li>
                <li className="nav-item">
                  <a href="javascript:void(0)" className="nav-link" onClick={this.handleRegisterOpen}>Register</a>
                </li>
                <li className="nav-item">
                  <a href="javascript:void(0)" className="nav-link" onClick={this.handleLoginOpen}>Login</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container header-content header-info">
          <h3>Sufaid Posh</h3>
          {/* <ul className="list-inline">
            <li className="list-inline-item">Home</li>
            <li className="list-inline-item">Page</li>
            <li className="list-inline-item">Page Name</li>
          </ul> */}
        </div>
        <Dialog
          title="Registration Form"
          actions={registerActions}
          modal={false}
          open={this.state.registerDialogOpen}
          onRequestClose={this.handleRegisterClose}
          autoScrollBodyContent={true}
          bodyClassName="registration-form"
        >
          <RegisterPage />
        </Dialog>


        <Dialog
          title="Login Form"
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

export default Header;