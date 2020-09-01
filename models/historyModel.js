const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    bank_id: {
      type: Schema.Types.ObjectId,
      ref: 'bank',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    rc_wd_cms_dv: {
      type: Number,
    },
    point: {
      type: Number,
    },
    bill: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const History = mongoose.model('history', historySchema);

module.exports = History;
