const User = require('../models/userModel');
const {
  authValidation,
  loginValidation,
  updateValidation,
} = require('../validate/auth.validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../utils/mailer');
const crypto = require('crypto');

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

  // checking if the user is already in the db
  const accNameExist = await User.findOne({ accName: req.body.accName });
  if (accNameExist) return res.status(400).send('accName already exists');

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('email already exists');

  const phoneExist = await User.findOne({ phone: req.body.phone });
  if (phoneExist) return res.status(400).send('phone already exists');

  const idNumberExist = await User.findOne({ idNumber: req.body.idNumber });
  if (idNumberExist) return res.status(400).send('idNumber already exists');

  const passportExist = await User.findOne({ passport: req.body.passport });
  if (passportExist) return res.status(400).send('passport already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const hashedOtp = await bcrypt.hash(req.body.otp, salt);

  try {
    const postUser = new User(
      {
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
        otp: hashedOtp,
        invested: 0,
        dividends: 0,
        commission: 0,
        point: 0,
        referralLink:
          'http://localhost:3000/users/register/' + req.body.accName,
        introducedLink: null,
      },
      function (err, user) {
        crypto.randomBytes(128, (err, buf) => {
          user.activeToken = user._id + buf.toString('hex');
          user.activeExpires = Date.now() + 24 * 3600 * 1000;
          const link = 'http://locolhost:3000/users/active/' + user.activeToken;
          mailer.send({
            to: req.body.email,
            subject: 'Welcome',
            html:
              'Please click <a href="' +
              link +
              '"> here </a> to activate your account.',
          });
          user.save((err, user) => {
            if (err) return next(err);
            res.send(
              'The activation email has been sent to' +
                user.accName +
                ', please click the activation link within 24 hours.'
            );
          });
        });
      }
    );
    await postUser.save();
    return res.json(postUser);
  } catch (err) {
    return res.json({ message: err });
  }
};

module.exports.activeToken = async (req, res, next) => {
  // find the corresponding user
  User.findOne(
    {
      activeToken: req.params.activeToken,
      activeExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (err) return next(err);
      // invalid activation code
      if (!user) {
        return res.render('message', {
          title: 'fail to activate',
          content:
            'Your activation link is invalid, please <a href="/users/register">register</a> again',
        });
      }

      // activate and save
      user.active = true;
      user.save(function (err, user) {
        if (err) return next(err);
        // activation success
        res.render('message', {
          title: 'activation success!',
          content: user.username + 'Please <a href="/users/login">login</a>',
        });
      });
    }
  );
};

module.exports.create = async (req, res, next) => {
  const { error } = authValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the user is already in the db
  const accNameExist = await User.findOne({ accName: req.body.accName });
  if (accNameExist) return res.status(400).send('accName already exists');

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('email already exists');

  const phoneExist = await User.findOne({ phone: req.body.phone });
  if (phoneExist) return res.status(400).send('phone already exists');

  const idNumberExist = await User.findOne({ idNumber: req.body.idNumber });
  if (idNumberExist) return res.status(400).send('idNumber already exists');

  const passportExist = await User.findOne({ passport: req.body.passport });
  if (passportExist) return res.status(400).send('passport already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const hashedOtp = await bcrypt.hash(req.body.otp, salt);

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
      otp: hashedOtp,
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
  const { error } = updateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const hashedOtp = await bcrypt.hash(req.body.otp, salt);

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
          otp: hashedOtp,
        },
      }
    );
    return res.json(update);
  } catch (err) {
    return res.json({ message: err });
  }
};

module.exports.yourProfile = async (req, res, next) => {
  // View logged in user profile
  res.send(req.user);
};

let refreshTokens = [];

module.exports.token = (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ _id: user._id });
    res.json({ accessToken: accessToken });
  });
};

module.exports.login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ accName: req.body.accName });
  if (!user) return res.status(400).send('accName is not found');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('invalid password');

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET
  );
  refreshTokens.push(refreshToken);
  res
    .header('auth-token', accessToken, refreshToken)
    .send({ accessToken: accessToken, refreshToken: refreshToken });
};

function generateAccessToken(user) {
  return jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  });
}

module.exports.logout = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};
