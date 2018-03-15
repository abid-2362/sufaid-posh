const bcrypt = require('bcrypt');
const Donor = require('../Models/Donor');

const LoginController = {
  donorLogin: function (user) {
    return new Promise(function (resolve, reject) {
      Donor.findOne({ email: user.email }, function (error, foundUser) {
        if (error) {
          return;
        } else {
          if (!foundUser) {
            reject({ status: error, message: 'User not found' });
            return;
          } else {
            bcrypt.compare(user.password, foundUser.password, function (error, valid) {
              if (valid) {
                let returnedUser = {
                  id: foundUser._id,
                  userType: foundUser.userType
                }
                resolve({ status: "ok", message: "Login Successful", user: returnedUser });
              } else {
                reject({ status: "error", message: "Invalid Password" });
              }
            });
          }
        }
      })
    });
  }
}

module.exports = LoginController;