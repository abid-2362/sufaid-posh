import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import people from "./peopleReducer";
import registrations from "./registrationReducer";

const rootReducer = combineReducers({
  registrations,
  routing: routerReducer
});

export default rootReducer;