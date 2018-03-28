const express = require('express');
const router = express.Router();
const passport = require('passport');
const logoutUser = require('../Controllers/logout');
// controllers.
// const LoginController = require('../Controllers/LoginController');

router.route('/user')
  .post(
    function(req, res, next) {
      console;
      next();
    },
    // first logout user before loggin in.
    logoutUser,
    passport.authenticate('local-user', { failureRedirect: '/login/failure' }),
    function (req, res) {
      if (req.user) {
        let userData = {};
        userData.id = req.user._id;
        userData.userType = req.user.userRole;
        res.json({ status: "ok", message: "Login successful", user: userData });
      } else {
        res.send({ status: "error", message: "Invalid login credentials" });
      }
    }
  );
router.route('/failure')
  .get(
    function (req, res) {
      res.json({ status: "error", message: "Invalid login credentials" });
    }
  )


module.exports = router;