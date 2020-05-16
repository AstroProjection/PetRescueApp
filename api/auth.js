const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
/// model
const Post = require('../model/Post');
const User = require('../model/User');
const auth = require('../auth/auth');

//   @route POST api/post
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

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      const isMatch = await bcrypt.compare(password, user.password);

      /// check if password or user matches with db
      if (!user || !isMatch)
        return res.status(400).json({ error: 'invalid credentials' });
      // verify and produce auth token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('secretkey'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          console.log('success');
          res.json({ token });
        }
      );
    } catch (error) {
      return res.status(400).json({ error: 'invalid credentials' });
    }
  }
);

module.exports = router;
