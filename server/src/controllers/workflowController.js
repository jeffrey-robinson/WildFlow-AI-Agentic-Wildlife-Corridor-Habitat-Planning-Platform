const workflowService = require('../services/workflowService');

exports.getWorkflows = async (req, res) => {
  try {
    const workflows = await workflowService.getAllWorkflows();
    res.json({ success: true, count: workflows.length, data: workflows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getDashboardMetrics = async (req, res) => {
  try {
    const metrics = await workflowService.getDashboardMetrics();
    res.json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createWorkflow = async (req, res) => {
  try {
    const workflow = await workflowService.createWorkflow({
      ...req.body,
      owner: req.user?.id,
    });
    res.status(201).json({ success: true, data: workflow });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.generateWorkflowFromAI = async (req, res) => {
  try {
    const { prompt, species } = req.body;
    const workflow = await workflowService.generateWorkflowFromAI(prompt, species);
    res.status(201).json({ success: true, data: workflow });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getWorkflowById = async (req, res) => {
  try {
    const workflow = await workflowService.getWorkflowById(req.params.id);
    if (!workflow) return res.status(404).json({ success: false, error: 'Workflow not found' });
    res.json({ success: true, data: workflow });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateWorkflow = async (req, res) => {
  try {
    const workflow = await workflowService.updateWorkflow(req.params.id, req.body);
    res.json({ success: true, data: workflow });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.duplicateWorkflow = async (req, res) => {
  try {
    const copy = await workflowService.duplicateWorkflow(req.params.id);
    res.status(201).json({ success: true, data: copy });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.executeWorkflow = async (req, res) => {
  const executionService = require('../services/executionService');
  try {
    const execution = await executionService.executeWorkflow(req.params.id, req.body);
    res.status(202).json({ success: true, data: execution });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteWorkflow = async (req, res) => {
  try {
    await workflowService.deleteWorkflow(req.params.id);
    res.json({ success: true, message: 'Workflow deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
