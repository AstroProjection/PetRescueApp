const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ errors: 'Authorization error' });
  try {
    const userinfo = jwt.verify(token, config.get('secretkey'));
    console.log(userinfo);
    req.user = userinfo.user;
    console.log('user is logged in');
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
