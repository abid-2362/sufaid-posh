const config = require('./serverConfig');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/sufaidPosh');
const Donor = require('./Models/Donor');
const User = require('./Models/User');
const app = express();
app.use(express.static('./dist'));

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// using session
app.use(session({
  secret: 'MySecretKey',
  saveUninitialized: false,
  resave: true
}));

// using passport
app.use(passport.initialize());
app.use(passport.session());


passport.use('donor', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    let query = Donor.findOne({ email: email });
    query.select('email password userType');
    query.exec(function (error, user) {
      if (error) {
        done(error, null);
      } else if (user) {
        bcrypt.compare(password, user.password, function (err, valid) {
          if (valid) {
            done(null, user);
          } else {
            done(err, null);
          }
        });
      } else {
        done(error, null);
      }
    });
  }
));

passport.use('user', new LocalStrategy(
  {
    usernameField: 'cnicNumber',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, cnicNumber, password, done) {
    let query = User.findOne({ cnicNumber: cnicNumber });
    query.select('cnicNumber password userType');
    query.exec(function (error, user) {
      if (error) {
        done(error, null);
      } else if (user) {
        bcrypt.compare(password, user.password, function (err, valid) {
          if (valid) {
            done(null, user)
          } else {
            done(err, null);
          }
        });
      } else {
        done(error, null);
      }
    });
  }
));

passport.serializeUser(function (user, done) {
  let key = {
    id: user._id,
    userType: user.userType
  }
  done(null, key);
});

passport.deserializeUser(function (key, done) {
  let Model;
  if (key.userType.toLowerCase() == "donor") {
    Model = Donor;
  } else {
    Model = User;
  }
  Model.findById(key.id, function (err, user) {
    done(null, user);
  });
});

// App Routes
const firstRoutes = require('./Routes/FirstRoutes');
app.use('/', firstRoutes);

// Login Routes
const loginRoutes = require('./Routes/LoginRoutes');
app.use('/login', loginRoutes);

// Registration Routes
const registrationRoutes = require('./Routes/Registration');
app.use('/registration', registrationRoutes);

app.listen(config.port, function () {
  console.log('server is running on localhost' + config.port);
})