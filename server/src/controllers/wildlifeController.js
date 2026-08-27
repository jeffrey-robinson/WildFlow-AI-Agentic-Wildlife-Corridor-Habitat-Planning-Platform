const WildlifeObservation = require('../models/WildlifeObservation');
const gisConfig = require('../config/gis');

exports.getSpecies = async (req, res) => {
  res.json({ success: true, data: gisConfig.supportedSpecies });
};

exports.getObservations = async (req, res) => {
  try {
    const filter = req.query.species ? { species: new RegExp(req.query.species, 'i') } : {};
    const observations = await WildlifeObservation.find(filter).sort({ timestamp: -1 });
    res.json({ success: true, count: observations.length, data: observations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createObservation = async (req, res) => {
  try {
    const obs = await WildlifeObservation.create(req.body);
    res.status(201).json({ success: true, data: obs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getObservationById = async (req, res) => {
  try {
    const obs = await WildlifeObservation.findById(req.params.id);
    if (!obs) return res.status(404).json({ success: false, error: 'Observation not found' });
    res.json({ success: true, data: obs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
