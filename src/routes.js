/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Common/Header';
// import Homepage from './components/Homepage/HomepageContainer';
import Homepage from './components/Homepage/HomepageContainer';
import NotFoundPage from './components/Common/NotFound';
import SinglePage from './components/SinglePage/SinglePageContainer';
import RegisterPage from './components/RegisterPage/RegisterPageContainer';
import AbstractPage from './components/AbstractPage/AbstractContainer';
import DonorRegistrationPage from './components/RegisterPage/DonorRegistrationForm';
import UserRegistrationPage from './components/RegisterPage/UserRegistrationForm';
import Footer from './components/Common/Footer';
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class CustomRoutes extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Homepage} />
          <Route exact={true} path="/abstract" component={AbstractPage} />
          <Route exact={true} path="/single-page" component={SinglePage} />
          <Route exact={true} path="/register" component={RegisterPage} />
          <Route exact={true} path="/donor-registration" component={DonorRegistrationPage} />
          <Route exact={true} path="/user-registration" component={UserRegistrationPage} />
          {/* <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} /> */}
          <Route component={NotFoundPage} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default CustomRoutes;
