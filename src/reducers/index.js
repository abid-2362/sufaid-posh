import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import people from "./peopleReducer";
// import registrations from "./registrationReducer";
// import loggedInUser from './loginReducer';
import { sessionReducer } from 'redux-react-session';

const rootReducer = combineReducers({
  // registrations,
  // loggedInUser,
  routing: routerReducer,
  session: sessionReducer
});

export default rootReducer;