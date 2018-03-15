// in polls/logic.js
import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
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

const registerDonorUserLogic = createLogic({
  type: "REGISTER_DONOR_USER", // only apply this logic to this type
  cancelType: "REGISTER_DONOR_USER_CANCEL", // cancel on this type
  // I dont want to skip the user registration if new user action has been fired before
  // completion of the previous one, so I will make latest as false
  // latest: true, // only take latest,
  latest: false, // complete all fired actions without skipping.
  process({ getState, action }, dispatch, done) {
    axios.post(url+'registration/donor', {
      user: action.payload
    })
    .then(resp => {
      toastr.info(resp.data);
    })
    .catch(err => {
      toastr.error(err);
    })
    .then(() => done());
  }
});

const registerUserLogic = createLogic({
  type: "REGISTER_USER", // only apply this logic to this type
  cancelType: "REGISTER_USER_CANCEL", // cancel on this type
  // I dont want to skip the user registration if new user action has been fired before
  // completion of the previous one, so I will make latest as false
  // latest: true, // only take latest,
  latest: false, // complete all fired actions without skipping.
  process({ getState, action }, dispatch, done) {
    axios.post(url+'registration/user', {
      user: action.payload
    })
    .then(resp => {
      toastr.info(resp.data);
    })
    .catch(err => {
      toastr.error(err);
    })
    .then(() => done());
  }
});

// pollsLogic
export default [
  // validationLogic,
  // addUniqueId,
  registerUserLogic,
  registerDonorUserLogic
];