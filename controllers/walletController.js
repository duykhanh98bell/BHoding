const Wallet = require('../models/historyModel');
const User = require('../models/userModel');
const UserBank = require('../models/userBankModel');
const InvestmentList = require('../models/investmentListModel');

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
    if (!checkMoney) return res.json('Chua duoc ket noi ngan hang');
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
    if (req.body.point < 100000)
      return res.json('So diem rut phai >= 100,000 point');
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
    } else if (checkNapRut.rc_wd_cms_dv == 2) {
      const check = await Wallet.updateOne(
        { _id: req.params.id },
        { $set: { status: 1 } }
      );
      const upPoint = await User.updateOne(
        { _id: checkNapRut.user_id },
        {
          $set: {
            point: checkNapRut.point + userPoint.point,
            commission: checkNapRut.point + userPoint.commission,
          },
        }
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
    const userBankMoney = await UserBank.findOne({
      bank_id: checkNapRut.bank_id,
      user_id: checkNapRut.user_id,
    });
    if (checkNapRut.rc_wd_cms_dv == 1) {
      const changeStatus = await Wallet.updateOne(
        { _id: req.params.id },
        { $set: { status: 1 } }
      );
      const upMoney = await UserBank.updateOne(
        { user_id: checkNapRut.user_id, bank_id: checkNapRut.bank_id },
        { $set: { money: checkNapRut.point + userBankMoney.money } }
      );
      return res.json('Chap nhan rut thanh cong');
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
// module.exports.totalInvested = async (req, res, next) => {
//   try {
//     const total = await User.aggregate([
//       {
//         $group: {
//           _id: '$__v',
//           totalComission: { $sum: '$invested' },
//         },
//       },
//     ]);
//     return res.json(total);
//   } catch (err) {
//     return res.json({ message: err });
//   }
// };
module.exports.totalInvested = async (req, res, next) => {
  try {
    const date = await InvestmentList.find({
      createdAt: { $gte: req.body.start, $lte: req.body.end },
      status: true,
    }).populate('investmentPackage_id');
    var dem = 0;
    for (var i = 0; i < date.length; i++) {
      dem =
        dem + date[i]['investmentPackage_id']['quantity'] * date[i]['quantity'];
      console.log('ok');
    }
    return res.json(dem);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.countAcc = async (req, res, next) => {
  try {
    const totalUser = await User.find({
      createdAt: { $gte: req.body.start, $lte: req.body.end },
    }).count();
    return res.json(totalUser);
  } catch (err) {
    return res.json({ message: err });
  }
};
// module.exports.totalLoaded = async (req, res, next) => {
//   try {
//     const totalLoaded = await Wallet.aggregate([
//       {
//         $match: {
//           rc_wd_cms_dv: { $in: [0] },
//         },
//       },
//       {
//         $group: {
//           _id: '$rc_wd_cms_dv',
//           totalLoaded: { $sum: '$point' },
//         },
//       },
//     ]);
//     return res.json(totalLoaded);
//   } catch (err) {
//     return res.json({ message: err });
//   }
// };
module.exports.totalLoaded = async (req, res, next) => {
  try {
    const date = await Wallet.find({
      createdAt: { $gte: req.body.start, $lte: req.body.end },
      status: true,
      rc_wd_cms_dv: 0,
    });
    var dem = 0;
    for (var i = 0; i < date.length; i++) {
      dem = dem + date[i]['point'];
    }
    return res.json(dem);
  } catch (err) {
    return res.json({ message: err });
  }
};
// module.exports.totalWithdraw = async (req, res, next) => {
//   try {
//     const totalWithdraw = await Wallet.aggregate([
//       { $match: { rc_wd_cms_dv: { $in: [1] } } },
//       {
//         $group: {
//           _id: '$rc_wd_cms_dv',
//           totalWithdraw: { $sum: '$point' },
//         },
//       },
//     ]);
//     return res.json(totalWithdraw);
//   } catch (err) {
//     return res.json({ message: err });
//   }
// };
module.exports.totalWithdraw = async (req, res, next) => {
  try {
    const date = await Wallet.find({
      createdAt: { $gte: req.body.start, $lte: req.body.end },
      status: true,
      rc_wd_cms_dv: 1,
    });
    var dem = 0;
    for (var i = 0; i < date.length; i++) {
      dem = dem + date[i]['point'];
    }
    return res.json(dem);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.totalComission = async (req, res, next) => {
  try {
    const total = await User.findOne({ _id: req.user._id });
    return res.json(total.commission);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.countUsersUnder = async (req, res, next) => {
  try {
    const checkUser = await User.findOne({ _id: req.user._id });
    const count = await User.find({
      introducedLink: checkUser.accName,
    }).count();
    return res.json(count);
  } catch (err) {
    return res.json({ message: err });
  }
};
