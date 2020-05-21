const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  image: {
    type: String,
    default: null,
  },
  comment: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },

      text: {
        type: String,
        require: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      name: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('Posts', PostSchema);
