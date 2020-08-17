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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      // user does not exist
      if (!user) return res.status(400).send('Invalid credentials!');

      const isMatch = await bcrypt.compare(password, user.password);
      /// check if password or user matches with db
      if (!isMatch) return res.status(400).send('Invalid credentials!');
      // verify and produce auth token
      // delete user.password;
      if (!user.confirmed) {
        // user has not confirmed email
        console.log('not confirmed');
        return res.status(401).send('Please verify your Email Address');
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      console.log('signing token');
      jwt.sign(
        payload,
        config.get('secretkey'),
        { expiresIn: 1800 },
        (err, token) => {
          console.log(err);
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).send('Invalid credentials!');
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
