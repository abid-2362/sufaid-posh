// in polls/logic.js
import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
import axios from 'axios';
import toastr from 'toastr';
const url = types.API_URL;

const loginDonorLogic = createLogic({
  type: types.LOGIN_DONOR, // only apply this logic to this type
  cancelType: types.LOGIN_DONOR_CANCEL, // cancel on this type
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.post(url + 'login/donor', {
      user: action.payload
    })
      .then(serverResponse => serverResponse.data)
      .then(resp => {
        if (resp.status == "ok") {
          // dispatch login success action with payload
          dispatch({ type: types.LOGIN_DONOR_SUCCESS, payload: resp.user });
          toastr.success('Login successful');
        } else {
          // display an invalid message
          // we have two different messages here in resp.message, which will tell us exactly
          // either email is wrong or password is wrong.
          // but we will display only the generic message to user for security reasons.
          toastr.error('Invalid email or password');
        }
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => {
        done();
      });
  }
});

const logoutLogic = createLogic({
  type: types.LOGOUT,
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(url + 'logout')
      .then(response => {
        // console.log(response);
        dispatch({type: types.LOGOUT_SUCCESS})
        toastr.success('Logout successful');
        done();
      })
  }
});

// pollsLogic
export default [
  // validationLogic,
  // addUniqueId,
  logoutLogic,
  loginDonorLogic
];