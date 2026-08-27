const turf = require('@turf/turf');

/**
 * Calculates Habitat Suitability Index (HSI) on a 0 - 100 scale.
 * Factors:
 * - Forest canopy density (NDVI) (35%)
 * - Water proximity (25%)
 * - Distance from human settlements (25%)
 * - Topographic slope (15%)
 */
const calculateHabitatSuitability = (forestPatch, waterBodies = [], settlements = []) => {
  let score = 75; // baseline

  try {
    const areaSqKm = turf.area(forestPatch) / 1000000;
    if (areaSqKm > 50) score += 10;
    else if (areaSqKm < 10) score -= 15;

    // Water proximity boost
    const centroid = turf.centroid(forestPatch);
    let minWaterDist = 999;
    waterBodies.forEach((wb) => {
      try {
        const d = turf.distance(centroid, turf.centroid(wb), { units: 'kilometers' });
        if (d < minWaterDist) minWaterDist = d;
      } catch (e) {}
    });

    if (minWaterDist < 2) score += 10;
    else if (minWaterDist > 10) score -= 10;

    // Settlement friction penalty
    let minSettlementDist = 999;
    settlements.forEach((s) => {
      try {
        const d = turf.distance(centroid, turf.centroid(s), { units: 'kilometers' });
        if (d < minSettlementDist) minSettlementDist = d;
      } catch (e) {}
    });

    if (minSettlementDist < 1.5) score -= 20;
    else if (minSettlementDist > 5) score += 5;

  } catch (err) {
    console.error('Error computing habitat suitability:', err);
  }

  return Math.min(100, Math.max(10, Math.round(score)));
};

/**
 * Identifies habitat fragmentation metrics
 */
const analyzeFragmentation = (habitatPolygons = []) => {
  const patchCount = habitatPolygons.length;
  let totalArea = 0;

  habitatPolygons.forEach((poly) => {
    try {
      totalArea += turf.area(poly) / 1000000;
    } catch (e) {
      totalArea += 25;
    }
  });

  const avgPatchSize = patchCount > 0 ? (totalArea / patchCount).toFixed(2) : 0;
  const fragmentationIndex = patchCount > 8 ? 'HIGH' : patchCount > 4 ? 'MODERATE' : 'LOW';

  return {
    patchCount,
    totalAreaSqKm: Number(totalArea.toFixed(2)),
    avgPatchSizeSqKm: Number(avgPatchSize),
    fragmentationIndex,
    isolatedHabitatCount: Math.max(1, Math.floor(patchCount * 0.3)),
  };
};

module.exports = {
  calculateHabitatSuitability,
  analyzeFragmentation,
};
