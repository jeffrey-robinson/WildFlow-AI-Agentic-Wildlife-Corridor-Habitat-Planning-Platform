const turf = require('@turf/turf');

const validateGeoJSON = (geoJson) => {
  if (!geoJson || typeof geoJson !== 'object') return { valid: false, reason: 'Invalid JSON object' };
  if (!geoJson.type) return { valid: false, reason: 'Missing "type" property' };

  if (geoJson.type === 'FeatureCollection') {
    if (!Array.isArray(geoJson.features)) return { valid: false, reason: 'FeatureCollection missing "features" array' };
  } else if (geoJson.type === 'Feature') {
    if (!geoJson.geometry || typeof geoJson.geometry !== 'object') return { valid: false, reason: 'Feature missing "geometry"' };
  }
  return { valid: true };
};

const getBBox = (geoJson) => {
  try {
    return turf.bbox(geoJson);
  } catch (err) {
    return [76.2, 11.2, 77.2, 11.9];
  }
};

const createPointFeature = (lng, lat, properties = {}) => {
  return turf.point([lng, lat], properties);
};

const createPolygonFeature = (coordinates, properties = {}) => {
  return turf.polygon([coordinates], properties);
};

const createLineStringFeature = (coordinates, properties = {}) => {
  return turf.lineString(coordinates, properties);
};

module.exports = {
  validateGeoJSON,
  getBBox,
  createPointFeature,
  createPolygonFeature,
  createLineStringFeature,
};
