const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ message: 'Access Denied' });

  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ _id: data._id });

    if (!user) {
      throw new Error()
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};
