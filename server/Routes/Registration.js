const express = require('express');
const router = express.Router();

const RegistrationController = require('../Controllers/RegistrationController');

// registration/donor route
router.route('/donor')
  .post(function (req, res) {
    RegistrationController.donorRegister(req.body.user)
      .then(function (response) {
        res.json(response.message);
      }).catch(function (response) {
        res.send(response.message);
      });
  });

router.route('/user')
  .post(function (req, res) {
    RegistrationController.userRegister(req.body.user)
      .then(function (response) {
        res.json(response.message)
      }).catch(function (response) {
        res.send(response.message);
      });
  });

module.exports = router;