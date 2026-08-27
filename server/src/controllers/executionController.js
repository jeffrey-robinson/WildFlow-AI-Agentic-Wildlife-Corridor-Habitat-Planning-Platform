const executionService = require('../services/executionService');

exports.getExecutions = async (req, res) => {
  try {
    const executions = await executionService.getAllExecutions();
    res.json({ success: true, count: executions.length, data: executions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getExecutionById = async (req, res) => {
  try {
    const execution = await executionService.getExecutionById(req.params.id);
    if (!execution) return res.status(404).json({ success: false, error: 'Execution record not found' });
    res.json({ success: true, data: execution });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTimeline = async (req, res) => {
  try {
    const timeline = await executionService.getExecutionTimeline(req.params.id);
    res.json({ success: true, data: timeline });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.pauseExecution = async (req, res) => {
  try {
    const updated = await executionService.pauseExecution(req.params.id);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.resumeExecution = async (req, res) => {
  try {
    const updated = await executionService.resumeExecution(req.params.id);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.cancelExecution = async (req, res) => {
  try {
    const updated = await executionService.cancelExecution(req.params.id);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
