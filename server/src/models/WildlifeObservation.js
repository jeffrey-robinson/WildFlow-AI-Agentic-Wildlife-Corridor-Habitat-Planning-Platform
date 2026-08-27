const mongoose = require('mongoose');

const wildlifeObservationSchema = new mongoose.Schema(
  {
    species: {
      type: String,
      required: true,
      index: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      default: 'Camera Trap / GPS Collar',
    },
    confidence: {
      type: Number,
      default: 0.95,
    },
    observationType: {
      type: String,
      enum: ['Direct Sight', 'Camera Trap', 'Telemetry Collar', 'Pugmark Footprint', 'Dung Count'],
      default: 'Direct Sight',
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WildlifeObservation', wildlifeObservationSchema);
