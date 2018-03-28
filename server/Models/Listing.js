const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const ListingSchema = new Schema({
/*
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
  address: String,
  phone: String,
  cnicNumber: String,
  userType: {
    type: String,
    default: "donor"
  }
*/
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String],
    required: true
  },
  estimatedCost: {
    type: Number,
    required: true
  },
  costRepeater: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cnicNumber: {
    type: String,
    required: true
  },
  img: {
    type: [String],
    default: ['430x275.png']
  },
  public: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Listing', ListingSchema);