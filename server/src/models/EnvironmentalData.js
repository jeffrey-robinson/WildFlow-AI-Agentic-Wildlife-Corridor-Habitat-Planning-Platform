const mongoose = require('mongoose');

const environmentalDataSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      default: 'Western Ghats Sector 4',
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number, // Celsius
      default: 26,
    },
    rainfall: {
      type: Number, // mm
      default: 1800,
    },
    vegetation: {
      type: String, // e.g. Dense Canopy NDVI 0.82
      default: 'NDVI 0.78 High Canopy',
    },
    waterAvailability: {
      type: String,
      default: 'Perennial River & Waterhole',
    },
    elevation: {
      type: Number, // meters
      default: 850,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      default: 'Sentinel-2 Satellite GIS Data',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('EnvironmentalData', environmentalDataSchema);
