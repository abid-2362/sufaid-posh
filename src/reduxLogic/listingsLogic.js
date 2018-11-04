// in polls/logic.js
import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
import * as listingActions from '../actions/ListingActions';
import axios from 'axios';
const url = types.API_URL;
import toastr from 'toastr';

// creating new listing.
const createListingLogic = createLogic({
  type: types.CREATE_LISTING, // only apply this logic to this type
  cancelType: types.CREATE_LISTING_CANCEL, // cancel on this type
  // I dont want to skip the user registration if new user action has been fired before
  // completion of the previous one, so I will make latest as false
  // latest: true, // only take latest,
  latest: true, // take the latest action.

  validate({ getState, action }, allow, reject) {
    let state = getState();
    if (!state.session.authenticated) {
      toastr.error('Unauthorized request');
    }
    if (state.session.user.userType != "seeker") {
      toastr.error("You don't have permission to submit listing, please register or login as a Seeker to submit your listing");
    } else {
      allow(action);
    }
  },

  process({ getState, action }, dispatch, done) {
    let state = getState();
    // action.payload is already an instance of FormData(), so just appended new user field
    let fd = action.payload;
    fd.append('user', state.session.user.id);

    axios.post(url + 'listings/createNewListing', fd)
      .then(resp => {
        toastr.info(resp.data.message);
        dispatch(listingActions.loadAllListings());
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

// loading listings from server
const loadListingLogic = createLogic({
  type: types.LOAD_ALL_LISTINGS,
  // cancelType: types.LOAD_ALL_LISTINGS_CANCELL,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'listings/getAllListings')
    .then(response => {
      dispatch(listingActions.loadAllListingsSuccess(response.data));
    }).catch(error => {
    }).then(() => done());
  }
});

// deleting a listing
const deleteListingLogic = createLogic({
  type: types.DELETE_LISTING,
  latest: true,
  validate({ getState, action }, allow, reject) {
    let state = getState();
    if (!state.session.authenticated) {
      toastr.error('Unauthorized request');
    } else {
      allow(action);
    }
    // if (state.session.user.userType != "seeker") {
    //   toastr.error("You don't have permission to submit listing, please register or login as a Seeker to submit your listing");
    // } else {

    // }
  },

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'listings/deleteListing', {
      id: action.payload,
    })
    .then(response => {
      if(response.data.status == "ok") {
        toastr.success(response.data.message);
      }
      // load listings again,
      if(getState().session.user.userType == "seeker") {
        dispatch(listingActions.loadMyListings(getState().session.user));
      }else if(getState().session.user.userType == "admin") {
        dispatch(listingActions.loadAllListings());
      }
    }).catch(error => {
    }).then(() => done());
  }
});

// Filtering Listings
const filterListingsLogic = createLogic({
  type: types.FILTER_LISTINGS,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'listings/filterListings', {
      listingInfo: action.payload
    })
    .then(response => {
      dispatch(listingActions.loadAllListingsSuccess(response.data));
    }).catch(error => {
    }).then(() => done());
  }
});

// Search Listings
const searchListingsLogic = createLogic({
  type: types.SEARCH_LISTINGS,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'listings/searchListings', {
      searchFilter: action.payload
    })
    .then(response => {
      dispatch(listingActions.loadAllListingsSuccess(response.data));
    }).catch(error => {
    }).then(() => done());
  }
});
// pollsLogic
export default [
  loadListingLogic,
  createListingLogic,
  deleteListingLogic,
  filterListingsLogic,
  searchListingsLogic
];