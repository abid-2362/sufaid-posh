// import objectAssign from 'object-assign';
// import initialState from './initialState';
// import * as types from '../constants/constants';

// // IMPORTANT: Note that with Redux, state should NEVER be changed.
// // State is considered immutable. Instead,
// // create a copy of the state passed and set new values on the copy.
// // Note that I'm using Object.assign to create a copy of current state
// // and update values on the copy.
// export default function registrationReducer(state = initialState.registrations, action) {
//   // let newState;

//   switch (action.type) {
//     case types.REGISTER_DONOR_USER:
//       console.log('registration reducer ', action);
//       return state;

//     case types.REGISTER_DONOR_USER_SUCCESS:
//       // For this example, just simulating a save by changing date modified.
//       // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
//       // return objectAssign({}, state, {dateModified: action.dateModified});
//       return objectAssign({}, state, {user: action.payload})

//     default:
//       return state;
//   }
// }
