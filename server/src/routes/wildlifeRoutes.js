const express = require('express');
const router = express.Router();
const {
  getSpecies,
  getObservations,
  createObservation,
  getObservationById,
} = require('../controllers/wildlifeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/species', protect, getSpecies);
router.get('/observations', protect, getObservations);
router.post('/observations', protect, createObservation);
router.get('/observations/:id', protect, getObservationById);

module.exports = router;
