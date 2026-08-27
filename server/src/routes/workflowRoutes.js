const express = require('express');
const router = express.Router();
const {
  getWorkflows,
  getDashboardMetrics,
  createWorkflow,
  generateWorkflowFromAI,
  getWorkflowById,
  updateWorkflow,
  duplicateWorkflow,
  executeWorkflow,
  deleteWorkflow,
} = require('../controllers/workflowController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getWorkflows);
router.get('/dashboard', protect, getDashboardMetrics);
router.post('/', protect, createWorkflow);
router.post('/generate', protect, generateWorkflowFromAI);
router.get('/:id', protect, getWorkflowById);
router.put('/:id', protect, updateWorkflow);
router.post('/:id/duplicate', protect, duplicateWorkflow);
router.post('/:id/execute', protect, executeWorkflow);
router.delete('/:id', protect, deleteWorkflow);

module.exports = router;
