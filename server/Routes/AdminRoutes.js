const express = require('express');
const router = express.Router();
const ensureAuthentication = require('../Controllers/EnsureAuthentication');
const AdminController = require('../Controllers/AdminController');
// const ListingController = require('../Controllers/ListingController');
// const path = require('path');

router.route('/getDashboardInfo').post(
  ensureAuthentication.adminAuthentication,
  function (req, res) {
    AdminController.getDashboardInfo()
      .then(function (response) {
        res.json(response);
      }).catch(function (error) {
        res.send(error);
      }
    );
  }
);
router.route('/getAllUsers').post(
  ensureAuthentication.adminAuthentication,
  function (req, res) {
    AdminController.getAllUsers()
      .then(function (response) {
        res.json(response);
      }).catch(function (error) {
        res.send(error);
      }
    );
  }
);

router.route('/deleteUser').post(
  ensureAuthentication.adminAuthentication,
  function (req, res) {
    AdminController.deleteUser(req.body.userId)
      .then(function (response) {
        res.json(response);
      }).catch(function (error) {
        res.send(error);
      }
    );
  }
);

router.route('/blockUser').post(
  ensureAuthentication.adminAuthentication,
  function (req, res) {
    AdminController.blockUser(req.body.userId)
      .then(function (response) {
        res.json(response);
      }).catch(function (error) {
        res.send(error);
      }
    );
  }
);

router.route('/unblockUser').post(
  ensureAuthentication.adminAuthentication,
  function (req, res) {
    AdminController.unblockUser(req.body.userId)
      .then(function (response) {
        res.json(response);
      }).catch(function (error) {
        res.send(error);
      }
    );
  }
);

router.route('/loadSettings').post(
  function (req, res) {
    AdminController.loadSettings()
      .then(function (response) {
        res.json(response);
      }).catch(function (error) {
        res.send(error);
      }
    );
  }
);

router.route('/saveSettings').post(
  ensureAuthentication.adminAuthentication,
  function (req, res) {
    AdminController.saveSettings(req.body.settings)
      .then(function (response) {
        res.json(response);
      }).catch(function (error) {
        res.send(error);
      }
    );
  }
);
module.exports = router;