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

export function loadAllListings() {
  return {
    type: types.LOAD_ALL_LISTINGS,
  }
}

export function loadAllListingsSuccess(listings) {
  return {
    type: types.LOAD_ALL_LISTINGS_SUCCESS,
    payload: listings
  }
}