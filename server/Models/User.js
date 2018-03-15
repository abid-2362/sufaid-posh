const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
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
  cnicNumber: {
    type: String,
    required: true,
    unique: true
  },
  bankName: String,
  bankAccountNumber: String,
  userType: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model('User', UserSchema);