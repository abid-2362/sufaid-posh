const express = require('express');
const router = express.Router();
const ensureAuthentication = require('../Controllers/EnsureAuthentication');
const ListingController = require('../Controllers/ListingController');

// // registration/donor route
// router.route('/donor')
//   .post(function (req, res) {
//     RegistrationController.donorRegister(req.body.user)
//       .then(function (response) {
//         res.json(response.message);
//       }).catch(function (response) {
//         res.send(response.message);
//       });
//   });

router.route('/createNewListing')
  .post(
    ensureAuthentication.userAuthentication,
    function (req, res) {
      ListingController.createNewListing(req.body.listing)
        .then(function (response) {
          res.json(response.message)
        }).catch(function (response) {
          res.send(response.message);
        });
    }
  );


router.route('/getAllListings')
  .post(
    function(req, res) {
      ListingController.getAllListings()
      .then(listings => {
        res.json(listings);
      }).catch(error => {
        res.send(error);
      });
    }
  );

module.exports = router;