// in polls/logic.js
import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
import * as listingActions from '../actions/ListingActions';
import axios from 'axios';
const url = types.API_URL;
import toastr from 'toastr';

/*
  const validationLogic = createLogic({
    type: types.REGISTER_DONOR_USER,
    validate({ getState, action }, allow, reject) {
      // const user = action.payload;
      // if (!getState().users[user.id]) { // can also hit server to check
      //   allow(action);
      // } else {
      //   reject({ type: USER_EXISTS_ERROR, payload: user, error: true })
      // }
      allow(action);
    }
  });
*/
/*
  const addUniqueId = createLogic({
    type: '*',
    transform({ getState, action }, next) {
      // add unique tid to action.meta of every action
      const existingMeta = action.meta || {};
      const meta = {
        ...existingMeta,
        tid: shortid.generate()
      },
      next({
        ...action,
        meta
      });
    }
  });
*/

const createListingLogic = createLogic({
  type: types.CREATE_LISTING, // only apply this logic to this type
  cancelType: types.CREATE_LISTING_CANCEL, // cancel on this type
  // I dont want to skip the user registration if new user action has been fired before
  // completion of the previous one, so I will make latest as false
  // latest: true, // only take latest,
  latest: true, // complete all fired actions without skipping.

  validate({ getState, action }, allow, reject) {
    let state = getState();
    if (!state.session.authenticated) {
      toastr.error('Unauthorized request');
    }
    if (state.session.user.userType != "seeker") {
      toastr.error("You don't have permission to submit listing, please register or login as a Seeker to submit your listing");
    } else {
      console.log('Validation before creating listing', state);
      console.log('Listing Payload', action.payload);
      allow(action);
    }
  },

  process({ getState, action }, dispatch, done) {
    let state = getState();
    action.payload.user = state.session.user.id;
    // console.log('Processing to create listing', state);
    // console.log('Listing Payload', action.payload);
    // done();

    axios.post(url + 'listings/createNewListing', {
      listing: action.payload
    })
      .then(resp => {
        console.log(resp);
        // toastr.info(resp.data);
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());

  }
});

const loadListingLogic = createLogic({
  type: types.LOAD_ALL_LISTINGS,
  // cancelType: types.LOAD_ALL_LISTINGS_CANCELL,
  latest: true,

  // validate: function ({ getState, action }, allow, reject) {
  //   let state = getState();
  //   if (state.listings.length < 0) {
  //     allow(action);
  //   } else {
  //     toastr.info('listings already loaded');
  //   }
  // },

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'listings/getAllListings')
    .then(response => {
      console.log(response);
      dispatch(listingActions.loadAllListingsSuccess(response.data));
    }).catch(error => {
      console.log('error', error);
    }).then(() => done());
  }
})

// pollsLogic
export default [
  // validationLogic,
  // addUniqueId,
  // registerUserLogic,
  loadListingLogic,
  createListingLogic
];