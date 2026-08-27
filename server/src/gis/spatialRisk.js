const turf = require('@turf/turf');

/**
 * Calculates human-wildlife conflict hotspots and risk layers.
 */
const calculateSpatialRisk = (corridorLine, roads = [], villages = [], historicalConflicts = []) => {
  let riskScore = 20;
  const riskHotspots = [];

  try {
    // Road crossing intersections
    roads.forEach((road, index) => {
      try {
        const intersects = turf.lineIntersect(corridorLine, road);
        if (intersects.features.length > 0) {
          intersects.features.forEach((pt) => {
            riskScore += 15;
            riskHotspots.push({
              type: 'HIGHWAY_CROSSING',
              latitude: pt.geometry.coordinates[1],
              longitude: pt.geometry.coordinates[0],
              description: `Critical Highway Intersection #${index + 1}`,
              riskLevel: 'HIGH',
            });
          });
        }
      } catch (e) {}
    });

    // Village buffer proximity
    villages.forEach((village, idx) => {
      try {
        const centroid = turf.centroid(village);
        const distance = turf.pointToLineDistance(centroid, corridorLine, { units: 'kilometers' });
        if (distance < 1.0) {
          riskScore += 20;
          riskHotspots.push({
            type: 'SETTLEMENT_ENCROACHMENT',
            latitude: centroid.geometry.coordinates[1],
            longitude: centroid.geometry.coordinates[0],
            description: `Settlement Encroachment Buffer Zone (${village.properties?.name || 'Village ' + (idx + 1)})`,
            riskLevel: 'CRITICAL',
          });
        }
      } catch (e) {}
    });

    // Historical conflict cluster proximity
    historicalConflicts.forEach((conflict) => {
      try {
        const pt = turf.point([conflict.longitude, conflict.latitude]);
        const dist = turf.pointToLineDistance(pt, corridorLine, { units: 'kilometers' });
        if (dist < 1.5) {
          riskScore += 8;
        }
      } catch (e) {}
    });
  } catch (err) {
    console.error('Error calculating spatial risk:', err);
  }

  const finalRiskScore = Math.min(100, Math.max(5, Math.round(riskScore)));
  let riskCategory = 'LOW';
  if (finalRiskScore > 65) riskCategory = 'CRITICAL';
  else if (finalRiskScore > 40) riskCategory = 'HIGH';
  else if (finalRiskScore > 20) riskCategory = 'MEDIUM';

  return {
    riskScore: finalRiskScore,
    riskCategory,
    riskHotspots,
    roadCrossingsCount: riskHotspots.filter((h) => h.type === 'HIGHWAY_CROSSING').length,
    settlementBreachesCount: riskHotspots.filter((h) => h.type === 'SETTLEMENT_ENCROACHMENT').length,
  };
};

module.exports = {
  calculateSpatialRisk,
};
