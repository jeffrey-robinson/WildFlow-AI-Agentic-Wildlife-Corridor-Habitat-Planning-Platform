const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['WILDLIFE_OBSERVATIONS', 'HABITAT_POLYGONS', 'ROADS_INFRASTRUCTURE', 'SETTLEMENTS_VILLAGES', 'WATER_SOURCES', 'CONFLICT_RECORDS', 'RASTER_VEGETATION'],
      required: true,
    },
    source: {
      type: String,
      default: 'Uploaded Dataset / GIS Repository',
    },
    filePath: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      enum: ['GeoJSON', 'CSV', 'Shapefile', 'KML'],
      default: 'GeoJSON',
    },
    coverage: {
      type: String,
      default: 'Nilgiri Biosphere Region',
    },
    metadata: {
      featureCount: { type: Number, default: 0 },
      bbox: { type: Array, default: [] },
      fields: { type: Array, default: [] },
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Dataset', datasetSchema);
