const UserBank = require('../models/userBankModel');
const Bank = require('../models/bankModel');
const User = require('../models/userModel');
const { userBankValidation } = require('../validate/userBank.validate');

module.exports.show = async (req, res, next) => {
  try {
    const show = await UserBank.find({ user_id: req.user._id }).populate(
      'bank_id'
    );
    return res.json(show);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.create = async (req, res, next) => {
  const { error } = userBankValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const acc = await UserBank.findOne({ accNumber: req.body.accNumber });
  if (acc) return res.status(400).send('so tai khoan da duoc dang ki');

  const card = await UserBank.findOne({ cardNumber: req.body.cardNumber });
  if (card) return res.status(400).send('so the da duoc dang ki');

  try {
    const user_bank = new UserBank({
      bank_id: req.body.bank_id,
      user_id: req.user._id,
      cardNumber: req.body.cardNumber,
      accNumber: req.body.accNumber,
      fullName: req.body.fullName,
      idNumber: req.body.idNumber,
      money: req.body.money,
    });
    await user_bank.save();
    return res.send('Chuyen tien thanh cong');
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.upmoneyAccNum = async (req, res, next) => {
  try {
    const checkMoney = await UserBank.find({ accNumber: req.params.id });
    const up = checkMoney[0].money + req.body.money;
    const upMoney = await UserBank.updateOne(
      { accNumber: req.params.id },
      {
        $set: {
          money: up,
        },
      }
    );
    return res.send('Nap thanh cong');
  } catch (err) {
    return res.json({
      message: err,
    });
  }
};
module.exports.upmoneyCardNum = async (req, res, next) => {
  try {
    const checkMoney = await UserBank.find({ cardNumber: req.params.id });
    const up = checkMoney[0].money + req.body.money;
    const upMoney = await UserBank.updateOne(
      { cardNumber: req.params.id },
      {
        $set: {
          money: up,
        },
      }
    );
    return res.send('Nap thanh cong');
  } catch (err) {
    return res.json({
      message: err,
    });
  }
};
