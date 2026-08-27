const riskService = require('../services/riskService');

exports.analyzeRisk = async (req, res) => {
  try {
    const result = await riskService.analyzeRisk(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getHotspots = async (req, res) => {
  try {
    const hotspots = await riskService.getHotspots();
    res.json({ success: true, count: hotspots.length, data: hotspots });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRiskById = async (req, res) => {
  try {
    const hotspots = await riskService.getHotspots();
    const item = hotspots.find((h) => h._id.toString() === req.params.id) || hotspots[0];
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
