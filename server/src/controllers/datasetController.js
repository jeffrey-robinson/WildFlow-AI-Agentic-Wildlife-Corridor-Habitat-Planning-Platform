const datasetService = require('../services/datasetService');

exports.getDatasets = async (req, res) => {
  try {
    const list = await datasetService.getDatasets();
    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createDataset = async (req, res) => {
  try {
    const dataset = await datasetService.createDataset({
      ...req.body,
      uploadedBy: req.user?.id,
    });
    res.status(201).json({ success: true, data: dataset });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getDatasetById = async (req, res) => {
  try {
    const dataset = await datasetService.getDatasetById(req.params.id);
    if (!dataset) return res.status(404).json({ success: false, error: 'Dataset not found' });
    res.json({ success: true, data: dataset });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.validateDataset = async (req, res) => {
  try {
    const result = await datasetService.validateDataset(req.params.id, req.body.geoJson);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteDataset = async (req, res) => {
  try {
    await datasetService.deleteDataset(req.params.id);
    res.json({ success: true, message: 'Dataset deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
