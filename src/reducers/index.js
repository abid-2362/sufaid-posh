import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import people from "./peopleReducer";
import registrations from "./registrationReducer";
import loggedInUser from './loginReducer';

const rootReducer = combineReducers({
  registrations,
  loggedInUser,
  routing: routerReducer
});

export default rootReducer;