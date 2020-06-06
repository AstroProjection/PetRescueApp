const mongoose = require('mongoose');
const AnimalsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true,
  },
  locality: {
    type: String,
    default: 'victoria-layout',
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  image: {
    type: String,
    default: null,
  },
  feeder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null,
  },
});

module.exports = mongoose.model('animals', AnimalsSchema);
