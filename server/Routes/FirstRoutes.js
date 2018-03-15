const express = require('express');
const router = express.Router();
const logoutUser = require('../Controllers/logout');
// controllers

// /logout route
router.route('/logout')
.get(function(req, res){
  if(logoutUser){
    res.send('Logout successful');
  }
});

module.exports = router;