const express = require('express');
const router = express.Router();
const ensureAuthentication = require('../Controllers/EnsureAuthentication');
const ListingController = require('../Controllers/ListingController');
const path = require('path');

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
      const formidable = require('formidable');
      let form = new formidable.IncomingForm();
      form.uploadDir = path.resolve(__dirname) + "/../uploads/listings/images";
      form.keepExtensions = true;
      form.maxFieldsSize = 10 * 1024 * 1024; // 10MB
      form.maxFileSize = 10 * 1024 * 1024; // 10MB
      form.multiples = true;
      form.type = 'multipart';
      form.parse(req, function (err, fields, files) {
        if (err) {
          res.json({
            status: "failed",
            message: "Images can't be uploaded",
            error: err
          });
        } else {
          let imgNames = [];
          let maxImagesAllowed = 3;
          for (let x = 0; x < maxImagesAllowed; x++) {
            if (files[`image${x}`]) {
              let nameArr = files[`image${x}`].path.split('\\');
              let fName = nameArr[nameArr.length - 1];
              imgNames.push(fName);
            }
          }
          ListingController.createNewListing(fields, imgNames)
            .then(function (response) {
              res.json(response);
              // res.json(response);
            }).catch(function (response) {
              res.send(response.message);
            }
            );
        }
      });
    }
  );


router.route('/getAllListings')
  .post(
    function (req, res) {
      ListingController.getAllListings()
        .then(listings => {
          res.json(listings);
        }).catch(error => {
          res.send(error);
        });
    }
  );


router.route('/getMyListings')
  .post(
    ensureAuthentication.userAuthentication,
    function (req, res) {
      ListingController.getMyListings(req.user)
        .then(listings => {
          res.json(listings);
        }).catch(error => {
          res.send(error);
        });
    }
  );

router.route('/getDonorListings')
  .post(
    ensureAuthentication.donorAuthentication,
    function (req, res) {
      ListingController.getDonorListings(req.user)
        .then(listings => {
          res.json(listings);
        }).catch(error => {
          res.send(error);
        });
    }
  );
router.route('/updateListing')
  .post(
    ensureAuthentication.userAuthentication,
    function (req, res) {
      const formidable = require('formidable');
      let form = new formidable.IncomingForm();
      form.uploadDir = path.resolve(__dirname) + "/../uploads/listings/images";
      form.keepExtensions = true;
      form.maxFieldsSize = 10 * 1024 * 1024; // 10MB
      form.maxFileSize = 10 * 1024 * 1024; // 10MB
      form.multiples = true;
      form.type = 'multipart';
      form.parse(req, function (err, fields, files) {
        if (err) {
          res.json({
            status: "failed",
            message: "Images can't be uploaded",
            error: err
          });
        } else {
          let imgNames = [];
          if (files) {
            let maxImagesAllowed = 3;
            for (let x = 0; x < maxImagesAllowed; x++) {
              if (files[`image${x}`]) {
                let nameArr = files[`image${x}`].path.split('\\');
                let fName = nameArr[nameArr.length - 1];
                imgNames.push(fName);
              }
            }
          }
          ListingController.updateListing(fields, imgNames)
            .then(function (response) {
              res.json(response);
            }).catch(function (error) {
              res.send(error);
            });
        }
      });
    }
  );
router.route('/deleteListing')
  .post(
    ensureAuthentication.userOrAdminAuthentication,
    function (req, res) {
      console;
      ListingController.deleteListing(req.body.id)
        .then(response => {
          res.json(response);
        }).catch(error => {
          res.send(error);
        });
    }
  );
router.route('/deleteDonorListing')
  .post(
    ensureAuthentication.donorAuthentication,
    function (req, res) {
      console;
      ListingController.deleteDonorListing(req.body.listingInfo)
        .then(response => {
          res.json(response);
        }).catch(error => {
          res.send(error);
        });
    }
  );
router.route('/wannaHelp')
  .post(
    ensureAuthentication.donorAuthentication,
    function (req, res) {
      ListingController.wannaHelp(req.body.listingInfo)
        .then(response => {
          res.json(response);
        }).catch(error => {
          res.send(error);
        });
    }
  );
router.route('/filterListings')
  .post(
    function (req, res) {
      ListingController.filterListings(req.body.listingInfo)
        .then(listings => {
          res.json(listings);
        }).catch(error => {
          res.send(error);
        });
    }
  );
router.route('/searchListings')
  .post(
    function (req, res) {
      ListingController.searchListings(req.body.searchFilter)
        .then(listings => {
          res.json(listings);
        }).catch(error => {
          res.send(error);
        });
    }
  );
module.exports = router;