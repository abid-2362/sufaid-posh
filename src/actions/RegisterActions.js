import * as types from '../constants/constants';

export function registerDonorUser(user) {
  return {
    type: types.REGISTER_DONOR_USER,
    payload: user
  }
}

export function registerUser(user) {
  return {
    type: types.REGISTER_USER,
    payload: user
  }
}