const express = require('express');
const router = express.Router();

const RegistrationController = require('../Controllers/RegistrationController');

router.route('/donor')
  .post(function (req, res) {
    RegistrationController.donorRegister(req.body.user)
    .then(function(response) {
      res.json(response.donor);
    }).catch(function(response) {
      res.send(response.message);
    });
  });

module.exports = router;