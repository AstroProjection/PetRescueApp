const mongoose = require('mongoose');

const LocalitySchema = new mongoose.Schema({
  position: {
    center: {
      type: [Number],
      index: '2dsphere',
      required: true,
    },
    zoom: {
      type: Number,
      required: true,
    },
  },
  locality: {
    type: String,
    required: true,
  },
  locality_unique: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['FeatureCollection'],
    default: 'FeatureCollection',
  },
  features: [
    {
      type: {
        type: String,
        enum: ['Feature'],
        default: 'Feature',
      },
      properties: {
        name: { type: String, required: true },
        dogs: { type: Array },
        cats: { type: Array },
        feeder: { type: String },
        displayName: { type: String, required: true },
      },
      geometry: {
        type: {
          type: String,
          enum: ['LineString'],
          // required: true,
          default: 'LineString',
        },
        coordinates: {
          type: [[Number]],
          // required: true,
          index: '2dsphere',
        },
      },
    },
  ],
});

module.exports = mongoose.model('locality', LocalitySchema, 'locality');
