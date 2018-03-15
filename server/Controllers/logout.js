function logout(req, res, next) {
  if(req.user) {
    req.session.destroy(function () {
      next();
    });
  }else{
    next();
  }
}

module.exports = logout;