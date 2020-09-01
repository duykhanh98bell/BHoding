const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    accName: {
      unique: true,
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    phone: {
      unique: true,
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateBirth: {
      type: Date,
      required: true,
    },
    addressId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    idNumber: {
      unique: true,
      type: String,
      required: true,
    },
    passport: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    invested: {
      type: Number,
    },
    dividends: {
      type: Number,
    },
    commission: {
      type: Number,
    },
    point: {
      type: Number,
    },
    referralLink: {
      unique: true,
      type: String,
    },
    introducedLink: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
