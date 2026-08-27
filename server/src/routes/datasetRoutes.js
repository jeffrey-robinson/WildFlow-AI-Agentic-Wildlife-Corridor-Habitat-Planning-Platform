const express = require('express');
const router = express.Router();
const {
  getDatasets,
  createDataset,
  getDatasetById,
  validateDataset,
  deleteDataset,
} = require('../controllers/datasetController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getDatasets);
router.post('/', protect, createDataset);
router.get('/:id', protect, getDatasetById);
router.post('/:id/validate', protect, validateDataset);
router.delete('/:id', protect, deleteDataset);

module.exports = router;
