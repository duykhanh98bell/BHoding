const User = require('../models/userModel');
const {
  authValidation,
  loginValidation,
} = require('../validate/auth.validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.show = async (req, res, next) => {
  try {
    const show = await User.find();
    return res.json(show);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.showOne = async (req, res, next) => {
  try {
    const showOne = await User.findOne({ _id: req.params.id });
    return res.json(showOne);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.register = async (req, res, next) => {
  const { error } = authValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const postUser = new User({
      fullName: req.body.fullName,
      accName: req.body.accName,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      dateBirth: req.body.dateBirth,
      addressId: req.body.addressId,
      address: req.body.address,
      idNumber: req.body.idNumber,
      passport: req.body.passport,
      password: hashedPassword,
      otp: req.body.otp,
      invested: 0,
      dividends: 0,
      commission: 0,
      point: 0,
      referralLink: 'http://localhost:3000/user/register/' + req.body.accName,
      introducedLink: null,
      status: 1,
    });
    await postUser.save();
    return res.json(postUser);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.create = async (req, res, next) => {
  const { error } = authValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const postUser = new User({
      fullName: req.body.fullName,
      accName: req.body.accName,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      dateBirth: req.body.dateBirth,
      addressId: req.body.addressId,
      address: req.body.address,
      idNumber: req.body.idNumber,
      passport: req.body.passport,
      password: hashedPassword,
      otp: req.body.otp,
      invested: 0,
      dividends: 0,
      commission: 0,
      point: 0,
      referralLink: 'http://localhost:3000/user/register/' + req.body.accName,
      introducedLink: req.params.id,
      status: 1,
    });
    await postUser.save();
    return res.json(postUser);
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.update = async (req, res, next) => {
  const { error } = authValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const update = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          fullName: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          gender: req.body.gender,
          dateBirth: req.body.dateBirth,
          addressId: req.body.addressId,
          address: req.body.address,
          idNumber: req.body.idNumber,
          passport: req.body.passport,
          password: hashedPassword,
          otp: req.body.otp,
        },
      }
    );
  } catch (err) {
    return res.json({ message: err });
  }
};
module.exports.login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ accName: req.body.accName });
  if (!user) return res.status(400).send('Sai ten dang nhap');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Sai pass');

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
};
