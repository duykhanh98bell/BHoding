const Investment = require('../models/investmentPackageModel');
const { investmentValidation } = require('../validate/investment.validate');

module.exports.showInvestment = async (req, res, next) => {
  try {
    const investment = await Investment.find();
    return res.json(investment);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports.postInvestment = async (req, res) => {
  const { error } = investmentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const postInvestment = await Investment.create(req.body);
    return res.json(postInvestment);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.showOneInvestment = async (req, res) => {
  try {
    const showOne = await Investment.findOne({ _id: req.params.id });
    return res.json(showOne);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.updateInvestment = async (req, res) => {
  try {
    const updateInvesment = await Investment.updateOne(
      { _id: req.params.id },
      {
        $set: {
          price: req.body.price,
          sellingTime: req.body.sellingTime,
        },
      }
    );
    res.json(updateInvesment);
  } catch (err) {
    res.json({ message: err });
  }
};
module.exports.deleteInvestment = async (req, res, next) => {
  try {
    const deleteIn = await Investment.remove({ _id: req.params.id });
    return res.json('xoa thanh cong');
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.onOff = async (req, res, next) => {
  try {
    const checkStatus = await Investment.findOne({ _id: req.params.id });
    if (checkStatus.status == 0) {
      const onOff = await Investment.updateOne(
        { _id: req.params.id },
        {
          $set: {
            status: 1,
          },
        }
      );
      return res.json('Mo ban thanh cong');
    } else if (checkStatus.status == 1) {
      const onOff = await Investment.updateOne(
        { _id: req.params.id },
        {
          $set: {
            status: 0,
          },
        }
      );
      return res.json('An thanh cong');
    }
  } catch (err) {
    return res.json({ message: err });
  }
};
