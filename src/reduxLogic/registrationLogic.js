import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
import axios from 'axios';
const url = types.API_URL;
import toastr from 'toastr';

const registerDonorUserLogic = createLogic({
  type: "REGISTER_DONOR_USER", // only apply this logic to this type
  cancelType: "REGISTER_DONOR_USER_CANCEL", // cancel on this type
  // I dont want to skip the user registration if new user action has been fired before
  // completion of the previous one, so I will make latest as false
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
  registerUserLogic,
  registerDonorUserLogic
];