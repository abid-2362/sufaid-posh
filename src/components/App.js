import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import CustomRoutes from "../routes";
import { HashRouter } from "react-router-dom";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import ScrollToTop from "./Common/ScrollToTop";

export default class App extends Component {
  render() {
    const { store, history } = this.props; //eslint-disable-line
    let persistor = persistStore(store)
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <ConnectedRouter history={history}>
            <CustomRoutes />
          </ConnectedRouter> */}
          <HashRouter>
            <ScrollToTop>
              <CustomRoutes />
            </ScrollToTop>
          </HashRouter>
        </PersistGate>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
