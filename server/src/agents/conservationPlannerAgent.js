const gisConfig = require('../config/gis');

class ConservationPlannerAgent {
  async execute(context) {
    const speciesName = context.workflowSnapshot?.species || context.species || 'Asian Elephant';
    const studyArea = context.workflowSnapshot?.studyArea || 'Nilgiri Biosphere Region';
    const speciesProfile = gisConfig.supportedSpecies.find((s) => s.id === speciesName.toLowerCase() || speciesName.toLowerCase().includes(s.id)) || gisConfig.supportedSpecies[0];

    const planSummary = {
      agent: 'planner',
      status: 'completed',
      species: speciesProfile.name,
      studyArea,
      minCorridorWidthKm: speciesProfile.minCorridorWidthKm,
      maxSlopeDegrees: speciesProfile.maxSlopeDegrees,
      roadSensitivity: speciesProfile.roadSensitivity,
      objectives: [
        `Identify suitable continuous habitat blocks for ${speciesProfile.name}`,
        `Detect habitat fragmentation and pinch points in ${studyArea}`,
        'Compute least-cost connectivity corridor paths avoiding high-risk human infrastructure',
      ],
      bounds: gisConfig.defaultBounds,
    };

    return {
      agent: 'planner',
      memoryUpdate: {
        plannerSummary: planSummary,
        speciesProfile,
        bounds: gisConfig.defaultBounds,
      },
      log: {
        level: 'info',
        message: `Conservation Planner initialized objective for ${speciesProfile.name} in ${studyArea}.`,
        metadata: planSummary,
      },
    };
  }
}

module.exports = new ConservationPlannerAgent();
