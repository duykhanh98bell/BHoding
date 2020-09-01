const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBankSchema = new Schema(
  {
    bank_id: {
      type: Schema.Types.ObjectId,
      ref: 'bank',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    accNumber: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
    },
    money: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const UserBank = mongoose.model('userBank', userBankSchema);

module.exports = UserBank;
