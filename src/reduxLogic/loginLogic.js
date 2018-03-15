// in polls/logic.js
import { createLogic } from 'redux-logic';
import { sessionService } from 'redux-react-session';
import * as types from '../constants/constants';
import axios from 'axios';
import toastr from 'toastr';
const url = types.API_URL;

const loginDonorLogic = createLogic({
  type: types.LOGIN_DONOR, // only apply this logic to this type
  cancelType: types.LOGIN_DONOR_CANCEL, // cancel on this type
  debounce: 250,
  latest: true,
  process({ getState, action }, dispatch, done) {
    // console.log(url+'login/donor');
    axios.post(url + 'login/donor', {
      email: action.payload.email,
      password: action.payload.password
    })
      .then(serverResponse => serverResponse.data)
      .then(resp => {
        if (resp.status == "ok") {
          // dispatch login success action with payload
          // dispatch({ type: types.LOGIN_DONOR_SUCCESS, payload: resp.user });
          sessionService.saveSession(resp.user)
          .then(() => {
            sessionService.saveUser(resp.user)
            .then(() => {
              toastr.success('Login successful');
            });
          })
        } else {
          // display an invalid message
          // we have two different messages here in resp.message, which will tell us exactly
          // either email is wrong or password is wrong.
          // but we will display only the generic message to user for security reasons.
          toastr.error(resp.message);
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

const loginUserLogic = createLogic({
  type: types.LOGIN_USER, // only apply this logic to this type
  cancelType: types.LOGIN_USER_CANCEL, // cancel on this type
  debounce: 250,
  latest: true,
  process({ getState, action }, dispatch, done) {
    // console.log(url+'login/donor');
    axios.post(url + 'login/user', {
      cnicNumber: action.payload.cnicNumber,
      password: action.payload.password
    })
      .then(serverResponse => serverResponse.data)
      .then(resp => {
        if (resp.status == "ok") {
          sessionService.saveSession(resp.user)
          .then(() => {
            sessionService.saveUser(resp.user)
            .then(() => {
              toastr.success('Login successful');
            });
          })
        } else {
          // display an invalid message
          // we have two different messages here in resp.message, which will tell us exactly
          // either email is wrong or password is wrong.
          // but we will display only the generic message to user for security reasons.
          toastr.error(resp.message);
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
    // first logout from server,
    axios.get(url + 'logout')
      .then(() => {
        // then delete session
        sessionService.deleteSession()
        .then(() => {
          // then delete user from session
          sessionService.deleteUser()
          .then(() => {
            // then dispatch logout action to remove the user from redux store.
            // dispatch({type: types.LOGOUT_SUCCESS});
            toastr.success('Logout successful');
            done();
          })
        })
      });
  }
});

// pollsLogic
export default [
  loginUserLogic,
  logoutLogic,
  loginDonorLogic
];