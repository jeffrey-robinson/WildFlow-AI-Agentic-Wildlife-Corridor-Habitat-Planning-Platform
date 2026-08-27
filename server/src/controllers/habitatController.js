const habitatService = require('../services/habitatService');

exports.getHabitats = async (req, res) => {
  try {
    const list = await habitatService.getHabitats();
    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createHabitat = async (req, res) => {
  try {
    const habitat = await habitatService.createHabitat(req.body);
    res.status(201).json({ success: true, data: habitat });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getHabitatById = async (req, res) => {
  try {
    const habitat = await habitatService.getHabitatById(req.params.id);
    if (!habitat) return res.status(404).json({ success: false, error: 'Habitat zone not found' });
    res.json({ success: true, data: habitat });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.analyzeHabitat = async (req, res) => {
  try {
    const result = await habitatService.analyzeHabitat(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
