// in polls/logic.js
import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
import * as listingActions from '../actions/ListingActions';
import axios from 'axios';
const url = types.API_URL;
import toastr from 'toastr';

const loadMyListingLogic = createLogic({
  type: types.LOAD_MY_LISTINGS,
  // cancelType: types.LOAD_ALL_LISTINGS_CANCELL,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url + 'listings/getMyListings')
      // user will be checked on server side, so I am not sending the user object to filter the listings
      .then(response => {
        console.log('listings loaded from server->',response);
        dispatch(listingActions.loadMyListingsSuccess(response.data));
      }).catch(error => {
        console.log('error', error);
      }).then(() => done());
  }
});

const updateListingLogic = createLogic({
  type: types.UPDATE_LISTING, // only apply this logic to this type
  cancelType: types.UPDATE_LISTING_CANCEL, // cancel on this type
  latest: true, // take the latest action.

  validate({ getState, action }, allow, reject) {
    let state = getState();
    if (!state.session.authenticated) {
      toastr.error('Unauthorized request');
    }
    if (state.session.user.userType != "seeker") {
      toastr.error("You don't have permission to edit listing, please register or login as a Seeker to submit or edit your listings");
    } else {
      console.log('Validation before creating listing', state);
      console.log('Listing Payload', action.payload);
      allow(action);
    }
  },

  process({ getState, action }, dispatch, done) {
    let state = getState();
    // action.payload.user = state.session.user.id;
    // console.log('Processing to create listing', state);
    // console.log('Listing Payload', action.payload);
    // done();
    // action.payload is already an instance of FormData(), so just appended new user field
    let fd = action.payload;
    fd.append('user', state.session.user.id);
    axios.post(url + 'listings/updateListing', fd)
      .then(resp => {
        // console.log(resp);
        toastr.info(resp.data.message);
        dispatch(listingActions.loadAllListings());
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});
// pollsLogic
export default [
  loadMyListingLogic,
  updateListingLogic
];