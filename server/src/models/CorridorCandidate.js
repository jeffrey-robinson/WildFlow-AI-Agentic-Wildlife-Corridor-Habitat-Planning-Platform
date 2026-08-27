const mongoose = require('mongoose');

const corridorCandidateSchema = new mongoose.Schema(
  {
    executionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Execution',
    },
    species: {
      type: String,
      required: true,
    },
    startHabitat: {
      type: String,
      required: true,
    },
    endHabitat: {
      type: String,
      required: true,
    },
    geometry: {
      type: Object, // GeoJSON LineString
      required: true,
    },
    distance: {
      type: Number, // km
      required: true,
    },
    habitatScore: {
      type: Number, // 0 - 100
      default: 80,
    },
    connectivityScore: {
      type: Number, // 0 - 100
      default: 85,
    },
    humanRisk: {
      type: Number, // 0 - 100
      default: 20,
    },
    roadRisk: {
      type: Number, // 0 - 100
      default: 30,
    },
    waterScore: {
      type: Number, // 0 - 100
      default: 75,
    },
    overallScore: {
      type: Number, // 0 - 100
      default: 82,
    },
    status: {
      type: String,
      enum: ['RECOMMENDED', 'VIABLE', 'HIGH_RISK', 'REJECTED'],
      default: 'VIABLE',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CorridorCandidate', corridorCandidateSchema);
