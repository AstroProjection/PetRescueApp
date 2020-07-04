const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ errors: 'Authorization error' });

  try {
    const userinfo = jwt.verify(token, config.get('secretkey'));
    req.user = userinfo.user;
    console.log(req.user);

    if (req.user.role === 'admin') {
      next();
    } else {
      throw new Error('not authorized!');
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'User not authorized!' });
  }
};
