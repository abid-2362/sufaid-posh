const dotenv = require('dotenv');
dotenv.config();
const config = require('./serverConfig');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const dbString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/sufaidPosh';
mongoose.connect(dbString);
const app = express();
const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
};
app.use(cors(corsOptions));
// For VsCode Debugger Server
app.use(express.static('./dist'));

// For external server
app.use(express.static('../dist'));

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// using session
app.use(session({
  secret: 'MySecretKey',
  saveUninitialized: true,
  resave: true,
  cookie: {
    httpOnly: false,
    secure: false,
  }
}));

// use passport JS Module for authentication purposes.
require('./modules/passport/passport')(app);

// App Routes
const firstRoutes = require('./Routes/FirstRoutes');
app.use('/', firstRoutes);

// Login Routes
const loginRoutes = require('./Routes/LoginRoutes');
app.use('/login', loginRoutes);

// Registration Routes
const registrationRoutes = require('./Routes/Registration');
app.use('/registration', registrationRoutes);

// Listing Routes
const listingRoutes = require('./Routes/ListingRoutes');
app.use('/listings', listingRoutes);

// Admin Routes
const adminRoutes = require('./Routes/AdminRoutes');
app.use('/admin', adminRoutes);

app.listen(config.port, function () {
  console.log('server is running on localhost:' + config.port); //eslint-disable-line
})