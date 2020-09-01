const Wallet = require('../models/historyModel');
const User = require('../models/userModel');
const UserBank = require('../models/userBankModel');

module.exports.show = async (req, res, next) => {
  try {
    const his = await Wallet.find({ user_id: req.user._id }).populate(
      'user_id'
    );
    return res.json(his);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.loadedPoint = async (req, res, next) => {
  try {
    const checkMoney = await UserBank.findOne({
      bank_id: req.params.id,
      user_id: req.user._id,
    });
    if (checkMoney.money >= req.body.point) {
      const loaded = new Wallet({
        bank_id: req.params.id,
        user_id: req.user._id,
        rc_wd_cms_dv: 0,
        point: req.body.point,
        bill: req.file.path,
        status: 0,
      });
      await loaded.save();
      const editMoney = await UserBank.updateOne(
        {
          bank_id: req.params.id,
          user_id: req.user._id,
        },
        { $set: { money: checkMoney.money - req.body.point } }
      );
      return res.json('Doi diem thanh cong, cho xac nhan');
    } else {
      return res.json('Khong du tien');
    }
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.withdraw = async (req, res, next) => {
  try {
    const checkPoint = await User.findOne({
      _id: req.user._id,
    });
    if (checkPoint.point >= req.body.point) {
      const withDr = new Wallet({
        bank_id: req.params.id,
        user_id: req.user._id,
        rc_wd_cms_dv: 1,
        point: req.body.point,
        bill: null,
        status: 0,
      });
      await withDr.save();
      const editPoint = await User.updateOne(
        {
          _id: req.user._id,
        },
        { $set: { point: checkPoint.point - req.body.point } }
      );
      return res.json('Rut diem thanh cong, cho xac nhan');
    } else {
      return res.json('Khong du diem');
    }
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.statusFalse = async (req, res, next) => {
  try {
    const check = await Wallet.find({ status: false }).populate('user_id');
    return res.json(check);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.acceptLoadedPoint = async (req, res, next) => {
  try {
    const checkNapRut = await Wallet.findOne({ _id: req.params.id });
    const userPoint = await User.findOne({ _id: checkNapRut.user_id });
    if (checkNapRut.rc_wd_cms_dv == 0) {
      const check = await Wallet.updateOne(
        { _id: req.params.id },
        { $set: { status: 1 } }
      );
      const upPoint = await User.updateOne(
        { _id: checkNapRut.user_id },
        { $set: { point: checkNapRut.point + userPoint.point } }
      );
      return res.json('Chap nhan nap thanh cong');
    }
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.acceptWithdraw = async (req, res, next) => {
  try {
    const checkNapRut = await Wallet.findOne({ _id: req.params.id });
    //return res.json(checkNapRut.point);
    const userBankMoney = await UserBank.findOne({
      bank_id: checkNapRut.bank_id,
      user_id: checkNapRut.user_id,
    });
    //return res.json(userBankMoney.money);
    if (checkNapRut.rc_wd_cms_dv == 1) {
      const changeStatus = await Wallet.updateOne(
        { _id: req.params.id },
        { $set: { status: 1 } }
      );
      const upMoney = await UserBank.updateOne(
        { user_id: checkNapRut.user_id, bank_id: checkNapRut.bank_id },
        { $set: { money: checkNapRut.point + userBankMoney.money } }
      );
      return res.json('Chap nhan nap thanh cong');
    }
    return res.json();
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.totalPoint = async (req, res, next) => {
  try {
    const point = await User.findOne({ _id: req.user._id });

    return res.json(point.point);
  } catch (err) {
    return res.json({ message: err });
  }
};
