const config = require('./serverConfig');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sufaidPosh');

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

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, username, password, done) {
    console;
  }
));

passport.serializeUser(function(user, done){

});

passport.deserializeUser(function(user, done){

});

// App Routes
const registrationRoutes = require('./Routes/Registration');
app.use('/registration', registrationRoutes);

app.listen(config.port, function () {
  console.log('server is running on localhost' + config.port);
})