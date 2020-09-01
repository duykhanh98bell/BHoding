const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investmentPackageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sellingTime: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const InvestmentPackage = mongoose.model(
  'investmentPackage',
  investmentPackageSchema
);

module.exports = InvestmentPackage;
