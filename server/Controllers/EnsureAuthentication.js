const config = require('../serverConfig');
const redirect = config.redirect;

const EnsureAuthentication = {
  userAuthentication: function(req, res, next) {
    if(req.user && req.user.userType.toLowerCase() == "user"){
      next();
    }else{
      res.redirect(redirect);
    }
  },

  donorAuthentication: function(req, res, next) {
    if(req.user && req.user.userType.toLowerCase() == "donor"){
      next();
    }else{
      res.redirect(redirect);
    }
  }
};
module.exports = EnsureAuthentication;