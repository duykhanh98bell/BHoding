const Bank = require('../models/bankModel');
const bankValidation = require('../validate/bank.validate');

module.exports.show = async (req, res) => {
  try {
    const banks = await Bank.find();
    return res.json(banks);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.showOne = async (req, res, next) => {
  try {
    const bank = await Bank.findOne({ _id: req.params.id });
    return res.json(bank);
  } catch (err) {
    return res.json({ message: err });
  }
};

module.exports.create = async (req, res, next) => {
  const { error } = bankValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const bank = await Bank.create(req.body);
    return res.json(bank);
  } catch (err) {
    return res.json({ message: err });
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const bankUpdate = await Bank.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
        },
      }
    );
    return res.json(bankUpdate);
  } catch (err) {
    return res.json({ message: err });
  }
};
