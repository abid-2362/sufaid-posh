const express = require('express');
const router = express.Router();
const logoutUser = require('../Controllers/logout');
const path = require('path');
// controllers

// serve static images
router.route('/image/:image')
.get(function(req, res) {
  var path = require('path');
  res.sendFile(path.resolve(__dirname+'/../uploads/listings/images/' +req.params.image));
});

// /logout route
router.route('/logout')
.get(function(req, res){
  if(logoutUser){
    res.send('Logout successful');
  }
});

module.exports = router;