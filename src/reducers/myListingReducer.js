import objectAssign from 'object-assign';
import initialState from './initialState';
import * as types from '../constants/constants';

export default function myLitsingsReducer(state = initialState.myListings, action) {
  // let newState;
  switch (action.type) {
    case types.LOAD_MY_LISTINGS_SUCCESS:
      return objectAssign(
        [],
        action.payload
      );

    // case types.UPDATE_LISTING_SUCCESS:
    //   // console.log('updateListingReducer->',state);
    //   return state;

    default:
      return state;
  }
}
