import * as types from '../constants/constants';

export function createListing(listing) {
  return {
    type: types.CREATE_LISTING,
    payload: listing
  }
}

export function createListingSuccess(listing) {
  return {
    type: types.CREATE_LISTING_SUCCESS,
    payload: listing
  }
}