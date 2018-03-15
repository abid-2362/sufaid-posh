const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const UserSchema = new Schema({
  cnicNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  password: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  city: {
    required: true,
    type: String
  },
  address: {
    type: String,
    required: true
  },
  phone: String,
  bankDetails: String,
  additionalInfo: String,
  public: {
    type: Boolean,
    required: true
  },
  userType: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model('User', UserSchema);