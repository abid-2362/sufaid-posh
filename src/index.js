/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
// import App from './components/App';
import App from './components/App';
import './assets/css/bootstrap.min.css';
import './assets/scss/style.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './components/Common/globalJquery.js';
import './assets/js/script.js';
import './plugins/nicescroll/js/jquery.nicescroll.min.js';
//  import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
require('./favicon.ico'); // Tell webpack to load favicon.ico
const store = configureStore();

render(
  <AppContainer>
    <MuiThemeProvider>
      <App store={store} history={history} />
    </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewRoot = require('./components/App').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
