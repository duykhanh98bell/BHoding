const InvestmentList = require('../models/investmentListModel');
const User = require('../models/userModel');
const InvestmentPackage = require('../models/investmentPackageModel');
const UserBank = require('../models/userBankModel');
const { DownloaderHelper } = require('node-downloader-helper');
const bcrypt = require('bcryptjs');
const Wallet = require('../models/historyModel');

module.exports.tradingpoint = async (req, res, next) => {
  try {
    const checkPrice = await InvestmentPackage.findOne({
      _id: req.body.investmentPackage_id,
    });
    const total = checkPrice.price * req.body.quantity;
    const checkPoint = await User.findOne({ _id: req.user._id });
    const validOtp = await bcrypt.compare(req.body.otp, req.user.otp);
    if (!validOtp) return res.status(400).send('sai otp');
    if (checkPoint.point >= total) {
      const trading = new InvestmentList({
        user_id: req.user._id,
        investmentPackage_id: req.body.investmentPackage_id,
        bank_id: null,
        quantity: req.body.quantity,
        total: checkPrice.price * req.body.quantity,
        money_point: 1,
        elecContract: req.file.path,
        payment: 'http://localhost:3000/' + req.file.path,
        status: false,
      });
      await trading.save();
      const updatePrice = await User.updateOne(
        { _id: req.user._id },
        {
          $set: {
            point: checkPoint.point - total,
          },
        }
      );
      if (checkPoint.introducedLink != null) {
        const checkLink = await User.findOne({
          accName: checkPoint.introducedLink,
        });
        const upComission = new Wallet({
          bank_id: null,
          user_id: checkLink._id,
          rc_wd_cms_dv: 2,
          point: (total * 5) / 100,
          bill: null,
          status: false,
        });
        await upComission.save();
      }
      return res.json('mua thanh cong, cho xac nhan');
    } else {
      return res.json('khong du diem');
    }
  } catch (err) {
    return res.json({ message: err });
  }
};

module.exports.tradingmoney = async (req, res, next) => {
  try {
    const checkPrice = await InvestmentPackage.findOne({
      _id: req.body.investmentPackage_id,
    });
    const checkPoint = await User.findOne({ _id: req.user._id });
    const total = checkPrice.price * req.body.quantity;
    const checkMoney = await UserBank.findOne({
      user_id: req.user._id,
      bank_id: req.body.bank_id,
    });
    const validOtp = await bcrypt.compare(req.body.otp, req.user.otp);
    if (!validOtp) return res.status(400).send('sai otp');
    if (checkMoney.money >= total) {
      const trading = new InvestmentList({
        user_id: req.user._id,
        investmentPackage_id: req.body.investmentPackage_id,
        bank_id: req.body.bank_id,
        quantity: req.body.quantity,
        total: checkPrice.price * req.body.quantity,
        money_point: 0,
        elecContract: req.file.path,
        payment: 'http://localhost:3000/' + req.file.path,
        status: false,
      });
      await trading.save();
      const updatePrice = await UserBank.updateOne(
        { user_id: req.user._id, bank_id: req.body.bank_id },
        {
          $set: {
            money: checkMoney.money - total,
          },
        }
      );
      if (checkPoint.introducedLink != null) {
        const checkLink = await User.findOne({
          accName: checkPoint.introducedLink,
        });
        const upComission = new Wallet({
          bank_id: null,
          user_id: checkLink._id,
          rc_wd_cms_dv: 2,
          point: (total * 5) / 100,
          bill: null,
          status: false,
        });
        await upComission.save();
      }
      return res.json('mua thanh cong, cho xac nhan');
    } else {
      return res.json('khong du tien trong tai khoan');
    }
  } catch (err) {
    return res.json({ message: err });
  }
};

module.exports.all = async (req, res, next) => {
  try {
    const all = await InvestmentList.find();
    return res.json(all);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.false = async (req, res, next) => {
  try {
    const investFalse = await InvestmentList.find({
      status: false,
    });
    return res.json(investFalse);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.acceptInvestment = async (req, res, next) => {
  try {
    const change = await InvestmentList.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: true,
        },
      }
    );
    const checkInvest = await InvestmentList.findOne({ _id: req.params.id });
    const checkInpack = await InvestmentPackage.findOne({
      _id: checkInvest.investmentPackage_id,
    });
    const checkUser = await User.findOne({ _id: checkInvest.user_id });
    const changeInvest = await User.updateOne(
      { _id: checkInvest.user_id },
      {
        $set: {
          invested:
            checkUser.invested + checkInvest.quantity * checkInpack.quantity,
        },
      }
    );
    return res.json('Xac nhan mua thanh cong');
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.statistical = async (req, res, next) => {
  try {
    const date = await InvestmentList.find({
      createdAt: { $gte: req.body.start, $lte: req.body.end },
      status: true,
      user_id: req.user._id,
    }).populate('investmentPackage_id');
    var dem = 0;
    for (var i = 0; i < date.length; i++) {
      dem =
        dem + date[i]['investmentPackage_id']['quantity'] * date[i]['quantity'];
    }
    return res.json(dem);
  } catch (err) {
    return res.json({ message: err });
  }
};
