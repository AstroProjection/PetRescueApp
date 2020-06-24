const mongoose = require('mongoose');

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
  dateTaken: {
    type: String,
    // required: true,
    default: null,
  },
  dateDue: {
    type: String,
    // required: true,
    default: null,
  },
  user: {
    type: String,
    default: null,
    // required: true,
  },
  cost: {
    type: Number,
    default: null,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  identity: {
    type: Number,
    required: true,
    default: null,
  },
  medical: {
    spayed: SpaySchema,
    vaccines: [VaccinesSchema],
    misc: [MiscSchema],
  },
});

module.exports = mongoose.model('animals', AnimalsSchema);
