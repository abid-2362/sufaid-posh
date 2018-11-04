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
import CreateListingPage from './components/CreateListingPage/CreateListingPageContainer';
import MyListingsPage from './components/MyListingsPage/MyListingsPageContainer';
import EditListingPage from './components/MyListingsPage/EditListingPage';
import DonorListingsPage from  './components/MyListingsPage/DonorListingsPageContainer';
import AdminPageContainer from  './components/Admin/AdminPageContainer';

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
          <Route exact={true} path="/single-page/:id" component={SinglePage} />
          <Route exact={true} path="/register" component={RegisterPage} />
          <Route exact={true} path="/create-listing" component={CreateListingPage} />
          <Route exact={true} path="/my-listings" component={MyListingsPage} />
          <Route exact={true} path="/edit-listing/:id" component={EditListingPage} />
          <Route exact={true} path="/donor-listing" component={DonorListingsPage} />
          <Route exact={true} path="/admin/:page" component={AdminPageContainer} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default CustomRoutes;
