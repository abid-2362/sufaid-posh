const express = require('express');
const router = express.Router();

// controllers.
const LoginController = require('../Controllers/LoginController');

// /login/donor route
router.route('/donor')
.post(function(req, res) {
  // donor login logic will be here.
  LoginController.donorLogin(req.body.user)
  .then(function(response){
    res.json(response);
  }).catch(function(error) {
    res.send(error);
  });
});


module.exports = router;