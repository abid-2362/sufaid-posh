import * as types from '../constants/constants';

export function loadDonorListings(user) {
  return {
    type: types.LOAD_DONOR_LISTINGS,
    payload: user
  }
}

export function loadDonorListingsSuccess(listings) {
  return {
    type: types.LOAD_DONOR_LISTINGS_SUCCESS,
    payload: listings
  }
}

export function deleteDonorListing(listingId, userId) {
  let listingInfo = {
    listingId: listingId,
    userId: userId
  };
  return {
    type: types.DELETE_DONOR_LISTING,
    payload: listingInfo
  }
}