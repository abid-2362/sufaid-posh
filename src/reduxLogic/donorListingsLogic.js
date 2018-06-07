import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
import * as donorListingsLogic from '../actions/donorListingActions';
import axios from 'axios';
const url = types.API_URL;
import toastr from 'toastr';

const wannaHelpListingLogic = createLogic({
  type: types.WANNA_HELP,
  latest: true,
  validate: function({ getState, action }, allow, reject) {
    let state = getState();
    if (state.session.user.userType != "donor") {
      toastr.error('Unauthorized request');
    } else {
      allow(action);
    }
  },

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'listings/wannaHelp', {
      listingInfo: action.payload,
    })
    .then(response => {
      if(response.data.status == "ok") {
        toastr.success(response.data.message);
      }
      // load listings again
      // dispatch(listingActions.loadDonorListings(getState().session.user));
    }).catch(error => {
      console.log('error', error);
      toastr.error(error);
    }).then(() => done());
  }
});

const loadDonorListingLogic = createLogic({
  type: types.LOAD_DONOR_LISTINGS,
  // cancelType: types.LOAD_ALL_LISTINGS_CANCELL,
  latest: true,

  validate: function({ getState, action }, allow, reject) {
    let state = getState();
    if (state.session.user.userType != "donor") {
      toastr.error('Unauthorized request');
    } else {
      allow(action);
    }
  },
  process: function ({ getState, action }, dispatch, done) {
    axios.post(url + 'listings/getDonorListings')
      // user will be checked on server side, so I am not sending the user object to filter the listings
      .then(response => {
        dispatch(donorListingsLogic.loadDonorListingsSuccess(response.data));
      }).catch(error => {
        console.log('error', error);
      }).then(() => done());
  }
});

const deleteDonorListingLogic = createLogic({
  type: types.DELETE_DONOR_LISTING,
  // cancelType: types.LOAD_ALL_LISTINGS_CANCELL,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'listings/deleteDonorListing', {
      listingInfo: action.payload,
    })
    .then(response => {
      if(response.data.status == "ok") {
        toastr.success(response.data.message);
      }
      // load listings again
      dispatch(donorListingsLogic.loadDonorListings(getState().session.user));
    }).catch(error => {
      toastr.error(error);
    }).then(() => done());
  }
});

// pollsLogic
export default [
  wannaHelpListingLogic,
  loadDonorListingLogic,
  deleteDonorListingLogic,
];