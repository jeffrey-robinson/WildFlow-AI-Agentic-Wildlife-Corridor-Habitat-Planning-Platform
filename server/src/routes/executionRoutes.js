const express = require('express');
const router = express.Router();
const {
  getExecutions,
  getExecutionById,
  getTimeline,
  pauseExecution,
  resumeExecution,
  cancelExecution,
} = require('../controllers/executionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getExecutions);
router.get('/:id', protect, getExecutionById);
router.get('/:id/timeline', protect, getTimeline);
router.post('/:id/pause', protect, pauseExecution);
router.post('/:id/resume', protect, resumeExecution);
router.post('/:id/cancel', protect, cancelExecution);

module.exports = router;
