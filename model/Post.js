const mongoose = require('mongoose');
const fs = require('fs');
const ROOT_PATH = require('../root');
const commentSchema = new mongoose.Schema(
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
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
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
    comments: [commentSchema],
  },
  { timestamps: true }
);

// PostSchema.pre('remove', (next, removeOptions) => {
//   console.log('pre ');
//   next();
//   // console.log(doc);
//   // fs.unlink(doc.image, (err) => {
//   //   if (err) {
//   //     next(Error('Failed to delete the Image'));
//   //   } else {
//   //     console.log('deleted the file');
//   //     next();
//   //   }
//   // });
// });

PostSchema.post('remove', (doc, next) => {
  /// removing the image for the post
  if (!doc.image) {
    console.log('no image to delete');
    next();
  }
  fs.unlink(ROOT_PATH + '\\client\\public\\' + doc.image, (err) => {
    if (err) {
      console.log(err);
      next(Error('Failed to delete the Image'));
    } else {
      console.log('deleted the file');
      next();
    }
  });
});

module.exports = mongoose.model('posts', PostSchema);
