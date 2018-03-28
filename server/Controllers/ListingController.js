// const config = require('../serverConfig');

const Listing = require('../Models/Listing');
// const isAlphanumeric = require('validator/lib/isAlphanumeric');
// const isEmpty = require('validator/lib/isEmpty');
// const isNumeric = require('validator/lib/isNumeric');
// const isEmail = require('validator/lib/isEmail');
// const isAlpha = require('validator/lib/isAlpha');


const ListingController = {
  createNewListing: function (listing) {
    return new Promise(function (resolve, reject) {
      // promise api should be available. This will work properly only if promise api is available.
      let newListing = new Listing();
      newListing.category = listing.category;
      newListing.title = listing.title;
      newListing.description = listing.description;
      newListing.requirements = listing.requirementsArray;
      newListing.estimatedCost = listing.estimatedCost;
      newListing.costRepeater = listing.costRepeater;
      newListing.uploader = listing.uploader;
      newListing.name = listing.name;
      newListing.address = listing.address;
      newListing.city = listing.city;
      newListing.phone = listing.phone;
      newListing.public = listing.public;
      newListing.cnicNumber = listing.cnicNumber;
      newListing.save(function (error, listing) {
        if (error) {
          reject({ message: 'Error in saving your listing, please make sure that you have provided the complete details.', error: error, listing: null });
        } else {
          resolve({ message: 'Listing saved', error: null, listing: listing });
        }
      });
    });
  },

  getAllListings: function () {
    return new Promise(function (resolve, reject) {
      let query = Listing.find();
      query.populate('user');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  }
}

module.exports = ListingController;