const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  email: String,
  address: {
    type: String,
    required: true
  },
  city: {
    required: true,
    type: String
  },
  phone: String,
  cnicNumber: String,
  bankDetails: String,
  additionalInfo: String,
  public: {
    type: Boolean,
    default: false
  },
  userRole: String
});

module.exports = mongoose.model('User', UserSchema);