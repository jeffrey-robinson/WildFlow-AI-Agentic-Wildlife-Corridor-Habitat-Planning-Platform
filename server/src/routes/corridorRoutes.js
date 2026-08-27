const express = require('express');
const router = express.Router();
const {
  getCorridors,
  generateCorridors,
  getCorridorById,
  analyzeCorridor,
  validateCorridor,
} = require('../controllers/corridorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCorridors);
router.post('/generate', protect, generateCorridors);
router.get('/:id', protect, getCorridorById);
router.post('/:id/analyze', protect, analyzeCorridor);
router.post('/:id/validate', protect, validateCorridor);

module.exports = router;
