import registrationLogic from './registrationLogic';
import loginLogic from './loginLogic';
import listingsLogic from './listingsLogic';
import myListingLogic from './myListingsLogic';
import donorListingLogic from './donorListingsLogic';
import adminLogic from './adminLogic';

export default [
  ...registrationLogic,
  ...loginLogic,
  ...listingsLogic,
  ...myListingLogic,
  ...donorListingLogic,
  ...adminLogic
];