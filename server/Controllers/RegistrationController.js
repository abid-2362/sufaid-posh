
const bcrypt = require('bcrypt');
const config = require('../serverConfig');
const saltRounds = config.saltRounds;
const Donor = require('../Models/Donor');
const User = require('../Models/User');


const RegistrationController = {

  donorRegister: function (user) {
    return new Promise(function (resolve, reject) {
      // promise api should be available. This will work properly only if promise api is available.
      bcrypt.hash(user.password, saltRounds)
        .then(function (passwordHash) {
          const donor = new Donor();
          donor.email = user.email;
          donor.password = passwordHash;
          donor.name = user.name;
          donor.city = user.city;
          donor.address = user.address;
          donor.phone = user.phone;
          donor.cnicNumber = user.cnicNumber;
          if (donor.email && donor.password && donor.name) {
            donor.save(function (error, donor) {
              if (error) {
                let message;
                if (error.code == 11000) {
                  message = "This email is already registered, Please login.";
                }
                reject({ status: "error", message: message });
              } else {
                resolve({ status: "ok", message: "Account has been registered successfully", donor: donor });
              }
            });
          } else {
            // no name, username and password provided, just return false;
            reject({ status: "error", message: "No name, email and password is provided, we can not create an account without this information." });
          }
        });
    });
  },

  // return { email: '', password: '', name:'',  address:'', city: '', phone: '', cnicNumber: '',
  //  bankDetails: '', additionalInfo: '', public: false };
  userRegister: function (user) {
    return new Promise(function (resolve, reject) {
      // promise api should be available. This will work properly only if promise api is available.
      bcrypt.hash(user.password, saltRounds)
        .then(function (passwordHash) {
          const newUser = new User();
          newUser.email = user.email;
          newUser.password = passwordHash;
          newUser.name = user.name;
          newUser.address = user.address;
          newUser.city = user.city;
          newUser.phone = user.phone;
          newUser.cnicNumber = user.cnicNumber;
          newUser.bankDetails = user.bankDetails;
          newUser.additionalInfo = user.additionalInfo;
          newUser.public = user.public;
          if (newUser.cnicNumber && newUser.password && newUser.name) {
            newUser.save(function (error, user) {
              if (error) {
                let message;
                if (error.code == 11000) {
                  message = "This cnic number is already registered, Please login.";
                }
                reject({ status: "error", message: message });
              } else {
                resolve({ status: "ok", message: "User has been registered successfully", user: newUser });
              }
            });
          } else {
            // no name, cnicNumber and password provided, just return false;
            reject({ status: "error", message: "No name, CNIC number and password is provided, we can not create an account without this information." });
          }
        });
    });
  }
}

module.exports = RegistrationController;