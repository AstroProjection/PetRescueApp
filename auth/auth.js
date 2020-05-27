const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'Authorization error' });

  try {
    const userinfo = jwt.verify(token, config.get('secretkey'));
    req.user = userinfo.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};