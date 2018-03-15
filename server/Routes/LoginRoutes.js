const express = require('express');
const router = express.Router();
const passport = require('passport');
const logoutUser = require('../Controllers/logout');
// controllers.
// const LoginController = require('../Controllers/LoginController');

// /login/donor route
/*
router.route('/donor')

  .post(function (req, res) {
    passport.authenticate('local', { failureRedirect: '/login' },
      function (req, res) {
        // if req.user, then success, else failure
        if (req.user) {
          res.json(user);
        } else {
          res.end('invalid login');
        }
      }
    );
    // // donor login logic will be here.
    // LoginController.donorLogin(req.body.user)
    // .then(function(response){
    //   res.json(response);
    // }).catch(function(error) {
    //   res.send(error);
    // });
  });
*/

router.route('/donor')
  .post(
    // first logout user before loggin in.
    logoutUser,
    passport.authenticate('donor', { failureRedirect: '/login/failure' }),
    function (req, res) {
      if (req.user) {
        let userData = {};
        userData.id = req.user._id;
        res.json({ status: "ok", message: "Login successful", user: userData });
      } else {
        res.send({ status: "error", message: "Invalid login credentials" });
      }
    }
  );


// /login/donor route
router.route('/user')
  .post(
    function(req, res, next){
      console;
      next();
    },
    // first logout user before loggin in.
    logoutUser,
    passport.authenticate('user', { failureRedirect: '/login/failure' }),
    function (req, res) {
      if (req.user) {
        let userData = {};
        userData.id = req.user._id;
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