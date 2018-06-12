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

export function loadMyListings(user) {
  return {
    type: types.LOAD_MY_LISTINGS,
    payload: user
  }
}

export function loadMyListingsSuccess(listings) {
  return {
    type: types.LOAD_MY_LISTINGS_SUCCESS,
    payload: listings
  }
}

export function updateListing(listing) {
  return {
    type: types.UPDATE_LISTING,
    payload: listing
  }
}

export function updateListingSuccess(listing) {
  return {
    type: types.UPDATE_LISTING_SUCCESS,
    payload: listing
  }
}

export function deleteListing(listingID) {
  return {
    type: types.DELETE_LISTING,
    payload: listingID
  }
}

export function deleteListingSuccess() {
  return {
    type: types.DELETE_LISTING_SUCCESS,
  }
}

export function wannaHelp(listingId, userId) {
  let listingInfo = {
    listingId: listingId,
    userId: userId
  }
  return {
    type: types.WANNA_HELP,
    payload: listingInfo
  }
}

export function filterListings(filter, value) {
  var filterInfo = {
    filter: filter,
    filterValue: value
  };
  return {
    type: types.FILTER_LISTINGS,
    payload: filterInfo
  }
}

export function searchListings(searchFilter) {
  return {
    type: types.SEARCH_LISTINGS,
    payload: searchFilter
  }
}