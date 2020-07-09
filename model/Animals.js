const mongoose = require('mongoose');

//model for post hook
const Streets = require('./Streets');

const SpaySchema = new mongoose.Schema({
  status: {
    type: Number,
    // required: true,
    default: 2,
  },
  hospital: {
    type: String,
    default: null,
    // required: true,
  },
  user: {
    type: String,
    default: null,
    // required: true,
  },
  cost: {
    type: Number,
    // required: true,
    default: null,
  },
});

const VaccinesSchema = new mongoose.Schema({
  vaccinename: {
    type: String,
    required: true,
  },
  vaccineDateTaken: {
    type: String,
    // required: true,
    default: '',
  },
  vaccineDateDue: {
    type: String,
    // required: true,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'users',
    // required: true,
  },
  cost: {
    type: Number,
    default: '',
    // required: true,
  },
});

const MiscSchema = new mongoose.Schema({
  ailment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const AnimalsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true,
  },
  locality: {
    type: String,
    default: '',
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  identity: {
    type: Number,
    required: true,
    default: 0,
  },
  medical: {
    spayed: SpaySchema,
    vaccines: [VaccinesSchema],
    misc: [MiscSchema],
  },
});

AnimalsSchema.post('remove', async (doc, next) => {
  // removing the animal from the streets
  await Streets.updateMany(
    {
      $pullAll: { dogs: [doc._id], cats: [doc._id] },
    },
    (err, doc) => {
      if (err) throw Error('Error clearing animal frm Street');
      // console.log(doc);
    }
  );
  // removing the image of the animal
  if (doc.image) {
    fs.unlink(doc.image, (err) => {
      if (err) {
        next(Error('Failed to delete the Image'));
      } else {
        console.log('deleted the file');
        next();
      }
    });
  }
  next();
});

module.exports = mongoose.model('animals', AnimalsSchema);
