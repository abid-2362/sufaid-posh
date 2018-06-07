import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import people from "./peopleReducer";
// import registrations from "./registrationReducer";
// import loggedInUser from './loginReducer';
import listingReducer from './listingReducer';
import myListingReducer from './myListingReducer';
import donorListingReducer from './donorListingReducer';
import { sessionReducer } from 'redux-react-session';

const rootReducer = combineReducers({
  // registrations,
  // loggedInUser,
  routing: routerReducer,
  session: sessionReducer,
  listings: listingReducer,
  myListings: myListingReducer,
  donorListings: donorListingReducer
});

export default rootReducer;