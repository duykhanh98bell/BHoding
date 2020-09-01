const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investmentListSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    investmentPackage_id: {
      type: Schema.Types.ObjectId,
      ref: 'investmentPackage',
    },
    bank_id: {
      type: Schema.Types.ObjectId,
      ref: 'bank',
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    money_point: {
      type: Number,
    },
    elecContract: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const InvestmentList = mongoose.model('investmentList', investmentListSchema);

module.exports = InvestmentList;
