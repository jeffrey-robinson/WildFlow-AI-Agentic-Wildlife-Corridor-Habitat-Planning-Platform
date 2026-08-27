const mongoose = require('mongoose');

const habitatZoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    geometry: {
      type: Object,
      required: true, // GeoJSON Polygon
    },
    habitatType: {
      type: String,
      default: 'Moist Deciduous Forest',
    },
    area: {
      type: Number, // sq km
      default: 0,
    },
    qualityScore: {
      type: Number, // 0 - 100
      default: 85,
    },
    waterAvailability: {
      type: Number, // 0 - 100
      default: 80,
    },
    vegetationScore: {
      type: Number, // 0 - 100
      default: 90,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('HabitatZone', habitatZoneSchema);
