const mongoose = require('mongoose');

const conflictEventSchema = new mongoose.Schema(
  {
    species: {
      type: String,
      required: true,
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      placeName: { type: String, default: 'Village Border Sector' },
    },
    eventType: {
      type: String,
      enum: ['Crop Raid', 'Road Crossing Incident', 'Fence Breach', 'Livestock Depredation', 'Human Encounter'],
      default: 'Crop Raid',
    },
    severity: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'MEDIUM',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      default: 'Forest Dept Incident Log',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ConflictEvent', conflictEventSchema);
