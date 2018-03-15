import * as types from '../constants/constants';

export function loginDonor(user) {
  return {
    type: types.LOGIN_DONOR,
    payload: user
  }
}

export function logout() {
  return {
    type: types.LOGOUT,
  }
}