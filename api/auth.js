const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
/// model
const Post = require('../model/Post');
const User = require('../model/User');
const Locality = require('../model/Locality');
const auth = require('../auth/auth');

//   @route POST api/auth
//   @desc Authorize user and get auth token [Login]
//   @access public

// above are just descriptions of the route.

router.post(
  '/',
  [
    check('email', 'email is required!').isEmail().notEmpty(),
    check('password', 'password is required')
      .notEmpty()
      .isLength({ min: 6, max: 12 }),
  ],
  async (req, res) => {
    ///checking that text/name,email is not empty
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      const isMatch = await bcrypt.compare(password, user.password);
      /// check if password or user matches with db
      if (!user || !isMatch)
        return res.status(400).json({ error: 'invalid credentials' });
      // verify and produce auth token
      delete user['password'];

      const payload = {
        user: {
          id: user.id,
          locality: user.locality,
          role: user.role,
        },
      };
      jwt.sign(
        payload,
        config.get('secretkey'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'invalid credentials' });
    }
  }
);

//   @route GET api/auth
//   @desc get user information [Login]
//   @access public

// above are just descriptions of the route.

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    // console.log('error:', err);
    return res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
