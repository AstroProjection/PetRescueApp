const mongoose = require('mongoose');

const LocalitySchema = new mongoose.Schema({
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
    required: true,
  },
  features: [
    {
      type: {
        type: String,
        enum: ['Feature'],
        default: 'Feature',
        required: true,
      },
      properties: {
        name: { type: String, required: true },
        dogs: { type: Array },
        cats: { type: Array },
        feeder: { type: String },
        displayName: { type: String, required: true },
        style: { type: String },
      },
      geometry: {
        type: {
          type: String,
          enum: ['LineString'],
          required: true,
        },
        coordinates: [
          {
            type: [Number],
            required: true,
          },
        ],
      },
    },
  ],
});

module.exports = mongoose.model('locality', LocalitySchema, 'locality');
