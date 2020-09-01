const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Bank = mongoose.model('bank', bankSchema);

module.exports = Bank;
