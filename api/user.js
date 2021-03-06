const express = require('express');
const router = express();
const config = require('config');
//
const auth = require('../auth/auth');
// email sender
const transporter = require('../auth/email');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
//model
const User = require('../model/User');
const Locality = require('../model/Locality');

//   @route Post api/user/
//   @desc Register User
//   @access public

// above are just descriptions of the route.

router.post(
  '/',
  [
    check('email', 'email is required!').isEmail().notEmpty(),
    check('password', 'password is required')
      .notEmpty()
      .isLength({ min: 6, max: 12 }),
    check('name', 'name is required').notEmpty(),
    check('locality', 'locality is required').notEmpty(),
  ],
  async (req, res) => {
    ///checking that text/name,email is not empty
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password, locality } = req.body;
      /// checking if user exists
      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'User already exists!' });
      // encrypting password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      /// creating user
      const localityID = await Locality.findOne({
        locality_unique: locality,
      }).select('_id');
      // return;
      const newUser = new User({
        name: name,
        password: encryptedPassword,
        email: email,
        locality: localityID,
      });
      await newUser.save();
      //creating token
      const payload = {
        user: {
          id: newUser.id,
          // role: newUser.role,
        },
      };

      jwt.sign(
        payload,
        config.get('EMAIL_SECRET'),
        {
          expiresIn: '7d',
        },
        (err, emailToken) => {
          const url = `http://localhost:5000/confirmation/t/${emailToken}`;

          transporter.sendMail({
            to: email,
            subject: 'Email verification : for www.petrescyou.in',
            html: `
                  This is only to verify that the email address belongs to you as it will be used for password reset and other user operations.
                  <br/>
                  Please click this link to confirm your email:
                  <br/>
                  <a href="${url}">${url}</a>`,
          });
        }
      );

      return res.status(200).json({ msg: 'User Registered!' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

//   @route GET api/user/
//   @desc Get user Info
//   @access private

// above are just descriptions of the route.

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -date');
    res.json(user);
  } catch (error) {
    console.error(error.errors);
  }
});

module.exports = router;
