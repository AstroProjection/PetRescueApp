const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  locality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'locality',
    required: true,
  },
});

module.exports = mongoose.model('users', userSchema);
