const express = require('express');
const router = express.Router();
const { analyzeRisk, getHotspots, getRiskById } = require('../controllers/riskController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeRisk);
router.get('/hotspots', protect, getHotspots);
router.get('/:id', protect, getRiskById);

module.exports = router;
