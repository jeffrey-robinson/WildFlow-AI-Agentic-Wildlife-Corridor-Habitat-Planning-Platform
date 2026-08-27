const express = require('express');
const router = express.Router();
const {
  getHabitats,
  createHabitat,
  getHabitatById,
  analyzeHabitat,
} = require('../controllers/habitatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getHabitats);
router.post('/', protect, createHabitat);
router.get('/:id', protect, getHabitatById);
router.post('/analyze', protect, analyzeHabitat);

module.exports = router;
