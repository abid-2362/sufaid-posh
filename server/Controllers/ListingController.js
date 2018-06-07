// const config = require('../serverConfig');

const Listing = require('../Models/Listing');
// const isAlphanumeric = require('validator/lib/isAlphanumeric');
// const isEmpty = require('validator/lib/isEmpty');
// const isNumeric = require('validator/lib/isNumeric');
// const isEmail = require('validator/lib/isEmail');
// const isAlpha = require('validator/lib/isAlpha');


const ListingController = {
  createNewListing: function (listing, imgNames) {
    return new Promise(function (resolve, reject) {
      // promise api should be available. This will work properly only if promise api is available.
      let newListing = new Listing();
      newListing.category = listing.category;
      newListing.title = listing.title;
      newListing.description = listing.description;
      newListing.requirements = JSON.parse(listing.requirements);
      newListing.estimatedCost = listing.estimatedCost;
      newListing.costRepeater = listing.costRepeater;
      newListing.uploader = listing.user;
      newListing.name = listing.name;
      newListing.address = listing.address;
      newListing.city = listing.city;
      newListing.phone = listing.phone;
      newListing.public = listing.public;
      newListing.cnicNumber = listing.cnicNumber;
      newListing.img = imgNames;
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
      query.populate('uploader');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },

  getMyListings: function (user) {
    return new Promise(function (resolve, reject) {
      let query = Listing.find({uploader: user.id});
      query.populate('uploader');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },

  updateListing: function (listing, imgNames) {
    return new Promise(function (resolve, reject) {
      // promise api should be available. This will work properly only if promise api is available.
      let updatedListing = {};
      updatedListing.category = listing.category;
      updatedListing.title = listing.title;
      updatedListing.description = listing.description;
      updatedListing.requirements = JSON.parse(listing.requirements);
      updatedListing.estimatedCost = listing.estimatedCost;
      updatedListing.costRepeater = listing.costRepeater;
      updatedListing.uploader = listing.user;
      updatedListing.name = listing.name;
      updatedListing.address = listing.address;
      updatedListing.city = listing.city;
      updatedListing.phone = listing.phone;
      updatedListing.public = listing.public;
      updatedListing.cnicNumber = listing.cnicNumber;
      if(imgNames.length > 0) {
        updatedListing.img = imgNames;
      }
      Listing.findByIdAndUpdate(listing._id, updatedListing, {new: true}, function(error, listing) {
        if(error) {
          reject({status: 'error', error: error});
        }else{
          resolve({status: 'ok', message: 'Listing Updated', error: null, listing: listing});
        }
      });
    });
  },

  deleteListing: function(id) {
    return new Promise(function (resolve, reject) {
      Listing.deleteOne({_id: id}, function(error) {
        if(error) {
          reject({status: 'error', error: error});
        }else{
          resolve({status: 'ok', message: 'Listing Deleted', error: null});
        }
      });
    });
  },
  wannaHelp: function(listingInfo) {
    const listingId = listingInfo.listingId;
    const userId = listingInfo.userId;
    return new Promise(function (resolve, reject) {
      Listing.findOneAndUpdate({_id: listingId}, {$addToSet: {favorites: userId}}, function(error) {
        if(error) {
          reject({status: 'error', error: error});
        }else{
          resolve({status: 'ok', message: 'Listing added to your favored listing', error: null});
        }
      });
    });
  },
  getDonorListings: function (user) {
    return new Promise(function (resolve, reject) {
      let query = Listing.find({favorites: user.id});
      // query.populate('uploader');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },
  deleteDonorListing: function(listingInfo) {
    const listingId = listingInfo.listingId;
    const userId = listingInfo.userId;
    return new Promise(function (resolve, reject) {
      Listing.findOneAndUpdate({_id: listingId}, { $pull: {favorites: userId} }, function(error) {
        if(error) {
          reject({status: 'error', error: error});
        } else {
          resolve({status: 'ok', message: 'Listing removed from favorites', error: null});
        }
      });
    });
  },

  filterListings: function (listingInfo) {
    let filter = listingInfo.filter;
    let filterValue = listingInfo.filterValue;
    return new Promise(function (resolve, reject) {
      /*
       filter will be different each time so using its value
       i.e if filter = 'category' then query will be find 'category' = filterValue;
       thses brackets "[]" are the part of syntax if want to provide a value from variable.
       if I provide without "[]" brackets, it will search for a key of "filter" = "filterValue"
      */
      let query = Listing.find({[filter]: filterValue});
      query.populate('uploader');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },

  searchListings: function (searchFilter) {
    return new Promise(function (resolve, reject) {
      let query = Listing.find({$text: {$search: searchFilter}});
      query.populate('uploader');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },
}

module.exports = ListingController;