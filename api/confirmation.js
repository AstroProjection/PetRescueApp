const express = require('express');
const jwt = require('jsonwebtoken');

// auth middleware

const auth = require('../auth/auth');
const config = require('config');
// model
const User = require('../model/User');
const sendEmail = require('../auth/email');

const router = express.Router();
//   @route GET /confirmation/:token
//   @desc authenticate the users email [Login]
//   @access public
// above are just descriptions of the route.
router.get('/t/:token', async (req, res) => {
  try {
    const {
      user: { id },
    } = jwt.verify(req.params.token, config.get('EMAIL_SECRET'));
    await User.updateOne({ _id: id }, { confirmed: true });
    console.log('verified');
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }

  return res.redirect('http://localhost:3000/login');
});

router.post('/r', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(502).send({ msg: 'Bad Request' });
    jwt.sign(
      payload,
      config.get('EMAIL_SECRET'),
      { expiresIn: '7d' },
      (err, token) => {
        sendEmail(token, email);
      }
    );
  } catch (error) {
    return res.status(502).send({ msg: 'Bad Request' });
  }
});

module.exports = router;
