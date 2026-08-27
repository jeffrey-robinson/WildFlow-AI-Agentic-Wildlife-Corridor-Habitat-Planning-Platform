const mongoose = require('mongoose');
const env = require('../config/env');
const User = require('../models/User');
const Workflow = require('../models/Workflow');
const WildlifeObservation = require('../models/WildlifeObservation');
const HabitatZone = require('../models/HabitatZone');
const EnvironmentalData = require('../models/EnvironmentalData');
const ConflictEvent = require('../models/ConflictEvent');
const Dataset = require('../models/Dataset');
const CorridorCandidate = require('../models/CorridorCandidate');

const seedData = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 3000 });
    }
    console.log('[Seed]: Connected to MongoDB. Seeding initial conservation datasets...');

    // Clear existing
    await User.deleteMany({});
    await Workflow.deleteMany({});
    await WildlifeObservation.deleteMany({});
    await HabitatZone.deleteMany({});
    await EnvironmentalData.deleteMany({});
    await ConflictEvent.deleteMany({});
    await Dataset.deleteMany({});
    await CorridorCandidate.deleteMany({});

    // 1. Create Users
    const adminUser = await User.create({
      name: 'Dr. Rajesh Sharma (Lead Wildlife Director)',
      email: 'admin@wildflow.ai',
      password: 'password123',
      role: 'admin',
    });

    const operatorUser = await User.create({
      name: 'Ananya Roy (GIS Conservation Operator)',
      email: 'operator@wildflow.ai',
      password: 'password123',
      role: 'operator',
    });

    // 2. Create Wildlife Observations
    const observations = [
      { species: 'Asian Elephant', latitude: 11.52, longitude: 76.48, observationType: 'Direct Sight', confidence: 0.98, source: 'GPS Telemetry Collar #402' },
      { species: 'Asian Elephant', latitude: 11.58, longitude: 76.54, observationType: 'Camera Trap', confidence: 0.95, source: 'Camera Trap Station CT-12' },
      { species: 'Asian Elephant', latitude: 11.45, longitude: 76.38, observationType: 'Dung Count', confidence: 0.90, source: 'Field Patrol Line 4' },
      { species: 'Bengal Tiger', latitude: 11.64, longitude: 76.62, observationType: 'Pugmark Footprint', confidence: 0.94, source: 'Forest Guard Survey' },
      { species: 'Bengal Tiger', latitude: 11.49, longitude: 76.42, observationType: 'Camera Trap', confidence: 0.97, source: 'Camera Trap Station CT-08' },
      { species: 'Indian Gaur', latitude: 11.55, longitude: 76.71, observationType: 'Direct Sight', confidence: 0.92, source: 'Ranger Station Observation' },
      { species: 'Indian Leopard', latitude: 11.68, longitude: 76.50, observationType: 'Camera Trap', confidence: 0.96, source: 'Camera Trap Station CT-24' },
    ];
    await WildlifeObservation.insertMany(observations);

    // 3. Create Habitat Zones
    const habitat1 = await HabitatZone.create({
      name: 'Mudumalai Core Forest Habitat',
      species: 'Asian Elephant',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [76.32, 11.48],
            [76.45, 11.48],
            [76.45, 11.60],
            [76.32, 11.60],
            [76.32, 11.48],
          ],
        ],
      },
      habitatType: 'Moist Deciduous & Teak Canopy',
      area: 321.5,
      qualityScore: 92,
      waterAvailability: 88,
      vegetationScore: 95,
    });

    const habitat2 = await HabitatZone.create({
      name: 'Bandipur Sanctuary Habitat Complex',
      species: 'Asian Elephant',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [76.60, 11.62],
            [76.78, 11.62],
            [76.78, 11.76],
            [76.60, 11.76],
            [76.60, 11.62],
          ],
        ],
      },
      habitatType: 'Dry Deciduous & Scrub Forest',
      area: 480.0,
      qualityScore: 88,
      waterAvailability: 82,
      vegetationScore: 86,
    });

    // 4. Create Environmental Data
    await EnvironmentalData.insertMany([
      { location: 'Mudumalai North Ridge', latitude: 11.56, longitude: 76.40, temperature: 24, rainfall: 1950, vegetation: 'NDVI 0.84 High Dense Canopy', elevation: 920 },
      { location: 'Bandipur South Riverbank', latitude: 11.65, longitude: 76.68, temperature: 27, rainfall: 1400, vegetation: 'NDVI 0.76 Bamboo Woodland', elevation: 840 },
    ]);

    // 5. Create Conflict Events
    await ConflictEvent.insertMany([
      {
        species: 'Asian Elephant',
        location: { latitude: 11.53, longitude: 76.51, placeName: 'Masinagudi Village Perimeter' },
        eventType: 'Crop Raid',
        severity: 'HIGH',
        description: 'Herd of 5 elephants breached solar fencing near sugarcane farmland.',
      },
      {
        species: 'Asian Elephant',
        location: { latitude: 11.61, longitude: 76.58, placeName: 'State Highway 17 Crossing Sector' },
        eventType: 'Road Crossing Incident',
        severity: 'CRITICAL',
        description: 'Heavy vehicular traffic blocked seasonal elephant movement corridor.',
      },
    ]);

    // 6. Create Seed Datasets
    await Dataset.insertMany([
      {
        name: 'Nilgiri Elephant Reserve GeoJSON Forest Cover',
        type: 'HABITAT_POLYGONS',
        source: 'State Forest Cartography Division 2025',
        format: 'GeoJSON',
        coverage: 'Nilgiri Biosphere Region (1,200 sq km)',
        metadata: { featureCount: 14, fields: ['habitatType', 'NDVI', 'canopyCoverPercentage'] },
        uploadedBy: adminUser._id,
      },
      {
        name: 'State Highway 17 & Rural Road Network LineStrings',
        type: 'ROADS_INFRASTRUCTURE',
        source: 'OpenStreetMap Infrastructure GIS',
        format: 'GeoJSON',
        coverage: 'Southern Forest Highway Corridor',
        metadata: { featureCount: 8, fields: ['roadClass', 'speedLimit', 'trafficDensity'] },
        uploadedBy: operatorUser._id,
      },
      {
        name: 'Human Settlement & Village Polygons Register',
        type: 'SETTLEMENTS_VILLAGES',
        source: 'National Remote Sensing Centre',
        format: 'GeoJSON',
        coverage: 'Buffer Villages (Masinagudi, Moyar, Gundlupet)',
        metadata: { featureCount: 22, fields: ['population', 'farmingType', 'fenceType'] },
        uploadedBy: operatorUser._id,
      },
    ]);

    // 7. Create Default Workflows
    await Workflow.create({
      name: 'Elephant Nilgiri Corridor & Conflict Avoidance Analysis',
      description: 'Multi-agent analysis to identify safest connectivity corridors between Mudumalai and Bandipur while minimizing highway crossings and village crop raids.',
      owner: adminUser._id,
      species: 'Asian Elephant',
      studyArea: 'Nilgiri Biosphere & Western Ghats Habitat Complex',
      status: 'ACTIVE',
      nodes: [
        { id: 'node-1', type: 'plannerNode', position: { x: 100, y: 150 }, data: { label: 'Conservation Planner Agent', agentType: 'planner', species: 'Asian Elephant' } },
        { id: 'node-2', type: 'habitatNode', position: { x: 380, y: 150 }, data: { label: 'Habitat Analysis Agent', agentType: 'habitat' } },
        { id: 'node-3', type: 'fragmentationNode', position: { x: 660, y: 150 }, data: { label: 'Habitat Fragmentation Agent', agentType: 'fragmentation' } },
        { id: 'node-4', type: 'corridorNode', position: { x: 940, y: 150 }, data: { label: 'Corridor Planning Agent', agentType: 'corridor' } },
        { id: 'node-5', type: 'riskNode', position: { x: 520, y: 350 }, data: { label: 'Risk Assessment Agent', agentType: 'risk' } },
        { id: 'node-6', type: 'validationNode', position: { x: 800, y: 350 }, data: { label: 'Validation Agent', agentType: 'validation' } },
        { id: 'node-7', type: 'recoveryNode', position: { x: 1080, y: 350 }, data: { label: 'Recovery Agent', agentType: 'recovery' } },
        { id: 'node-8', type: 'monitoringNode', position: { x: 800, y: 550 }, data: { label: 'Monitoring Agent', agentType: 'monitoring' } },
      ],
      edges: [
        { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true },
        { id: 'e2-3', source: 'node-2', target: 'node-3', animated: true },
        { id: 'e3-4', source: 'node-3', target: 'node-4', animated: true },
        { id: 'e4-5', source: 'node-4', target: 'node-5', animated: true },
        { id: 'e5-6', source: 'node-5', target: 'node-6', animated: true },
        { id: 'e6-7', source: 'node-6', target: 'node-7', animated: true },
        { id: 'e7-8', source: 'node-7', target: 'node-8', animated: true },
      ],
      tags: ['Asian Elephant', 'Corridor Planning', 'High Priority'],
    });

    console.log('[Seed Completed]: Successfully populated admin user, operator user, habitats, observations, datasets & default workflow.');
    if (require.main === module) process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err.message);
    if (require.main === module) process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
