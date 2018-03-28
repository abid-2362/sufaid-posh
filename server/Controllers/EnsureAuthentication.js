const config = require('../serverConfig');
const redirect = config.redirect;

const EnsureAuthentication = {
  userAuthentication: function(req, res, next) {
    if(req.user && req.user.userRole.toLowerCase() == "seeker"){
      next();
    }else{
      res.send(401);
    }
  },

  donorAuthentication: function(req, res, next) {
    if(req.user && req.user.userRole.toLowerCase() == "donor"){
      next();
    }else{
      res.send(401);
    }
  }
};
module.exports = EnsureAuthentication;