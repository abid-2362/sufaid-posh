const express = require('express');
const router = express.Router();

// controllers



// /logout route
router.route('/logout')
.get(function(req, res){
  req.session.destroy(function (err) {
    res.send('logout successful');
  });
});


module.exports = router;