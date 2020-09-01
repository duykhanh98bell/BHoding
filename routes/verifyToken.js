const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Truy cap bi tu choi');

  try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verify;
    next();
  } catch (err) {
    return res.status(400).send('Token khong hop le');
  }
};
