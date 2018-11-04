// const config = require('../serverConfig');
// const Donor = require('../Models/Donor');
const User = require('../Models/User');
const Listing = require('../Models/Listing');
const Settings = require('../Models/Settings');


const AdminController = {
  getDashboardInfo: function () {
    // const totalUsers = User.find().count(function(error, result) {}); //excluding Admin
    return new Promise(function (resolve, reject) {
      let stats = {};
      User.count(function (error, result) {
        stats.totalUsers = result - 1; //async function
        Listing.count(function (err, count) {
          if (error) {
            reject(error);
          }
          stats.totalListings = count;
          User.find({ userRole: 'donor' }).count(function (error, count) {
            if (error) {
              reject(error);
            }
            stats.totalDonors = count;
            User.find({ userRole: 'seeker' }).count(function (error, count) {
              if (error) {
                reject(error);
              }
              stats.totalSeekers = count;
              resolve(stats);
            });
          });
        })
      });
    });

  },

  getAllUsers: function () {
    // const totalUsers = User.find().count(function(error, result) {}); //excluding Admin
    return new Promise(function (resolve, reject) {
      User.find({ $or: [{ userRole: 'donor' }, { userRole: 'seeker' }] }, function (error, users) {
        if (error) {
          reject(error);
        } else {
          resolve(users);
        }
      });
    });

  },

  deleteUser: function (userId) {
    return new Promise(function (resolve, reject) {
      User.deleteOne({ _id: userId }, function (error) {
        if (error) {
          reject({ status: 'error', error: error });
        } else {
          resolve({ status: 'ok', message: 'User Deleted', error: null });
        }
      });
    });
  },

  blockUser: function (userId) {
    return new Promise(function (resolve, reject) {
      User.findByIdAndUpdate({ _id: userId }, {blocked: true}, function (error) {
        if (error) {
          reject({ status: 'error', error: error });
        } else {
          resolve({ status: 'ok', message: 'User Blocked', error: null });
        }
      });
    });
  },

  unblockUser: function (userId) {
    return new Promise(function (resolve, reject) {
      User.findByIdAndUpdate({ _id: userId }, {blocked: false}, function (error) {
        if (error) {
          reject({ status: 'error', error: error });
        } else {
          resolve({ status: 'ok', message: 'User Unblocked', error: null });
        }
      });
    });
  },

  loadSettings: function () {
    return new Promise(function (resolve, reject) {
      Settings.find({}, function (error, settings) {
        if (error) {
          reject({ status: 'error', error: error });
        } else {
          resolve(settings);
        }
      });
    });
  },

  saveSettings: function (settings) {
    let newSettings = {};
    newSettings.orgName = settings.orgName;
    newSettings.orgDescription = settings.orgDescription;
    newSettings.contactHeading = settings.contactHeading;
    newSettings.contactAddress = settings.contactAddress;
    newSettings.contactEmail = settings.contactEmail;
    newSettings.contactPhone = settings.contactPhone;
    newSettings.thirdColumnHeading = settings.thirdColumnHeading;
    newSettings.thirdColumnText = settings.thirdColumnText;
    return new Promise(function (resolve, reject) {
      Settings.findByIdAndUpdate({ _id: settings._id }, newSettings, function (error) {
        if (error) {
          reject({ status: 'error', error: error });
        } else {
          resolve({ status: 'ok', message: 'Settings Updated', error: null });
        }
      });
    });
  },
}

module.exports = AdminController;