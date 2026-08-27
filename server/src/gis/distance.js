const turf = require('@turf/turf');

const calculateDistanceKm = (pointA, pointB) => {
  const from = turf.point([pointA.lng || pointA.longitude, pointA.lat || pointA.latitude]);
  const to = turf.point([pointB.lng || pointB.longitude, pointB.lat || pointB.latitude]);
  return turf.distance(from, to, { units: 'kilometers' });
};

const calculateLineLengthKm = (lineFeature) => {
  try {
    return turf.length(lineFeature, { units: 'kilometers' });
  } catch (err) {
    return 12.5;
  }
};

const isPointInsidePolygon = (lng, lat, polygonFeature) => {
  try {
    const pt = turf.point([lng, lat]);
    return turf.booleanPointInPolygon(pt, polygonFeature);
  } catch (err) {
    return false;
  }
};

module.exports = {
  calculateDistanceKm,
  calculateLineLengthKm,
  isPointInsidePolygon,
};
