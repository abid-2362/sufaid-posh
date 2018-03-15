
const Donor = require('../Models/Donor');
const bcrypt = require('bcrypt');
const config = require('../serverConfig');
const saltRounds = config.saltRounds;


const RegistrationController = {

  donorRegister: function(user) {
    return new Promise(function(resolve, reject){
      // promise api should be available. This will work properly only if promise api is available.
      bcrypt.hash(user.password, saltRounds)
      .then(function(passwordHash) {
        const donor = new Donor();
        donor.email = user.email;
        donor.password = passwordHash;
        donor.name = user.name;
        donor.city = user.city;
        donor.address = user.address;
        donor.phone = user.phone;
        donor.cnicNumber = user.cnicNumber;
        if(donor.email && donor.password && donor.name) {
          donor.save(function(error, donor){
            if(error) {
              let message;
              if(error.code == 11000) {
                message = "This email is already registered, Please login.";
              }
              reject({status: "error", message: message});
            }else{
              resolve({status: "ok", donor: donor});
            }
          });
        }else{
          // no name, username and password provided, just return false;
          reject({status: "error", message: "No name, email and password is provided, we can not create an account without this information."});
        }
      });
      // .catch(function(error){
      //     reject({status: "error", message: "Error in hashing the password", error: error});
      // });
    });


  }
}

module.exports = RegistrationController;