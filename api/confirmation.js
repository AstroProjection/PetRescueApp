const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('config');
// model
const User = require('../model/User');

const router = express.Router();
//   @route GET /confirmation/:token
//   @desc authenticate the users email [Login]
//   @access public

// above are just descriptions of the route.

router.get('/:token', async (req, res) => {
  try {
    const {
      user: { id },
    } = jwt.verify(req.params.token, config.get('EMAIL_SECRET'));
    await User.updateOne({ _id: id }, { confirmed: true });
  } catch (errors) {
    res.send({ error });
  }

  return res.redirect('http://localhost:3000/login');
});

module.exports = router;
