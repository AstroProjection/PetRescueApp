const mongoose = require('mongoose');

const StreetsSchema = new mongoose.Schema({
  streetname: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  feeder: {
    type: String,
  },
  dogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'animals',
    },
  ],

  cats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'animals',
    },
  ],
});

module.exports = mongoose.model('streets', StreetsSchema);
