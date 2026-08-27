const { generateCorridors } = require('../gis/corridorAnalysis');

class CorridorPlannerAgent {
  async execute(context) {
    const species = context.workflowSnapshot?.species || 'Asian Elephant';
    const corridors = generateCorridors(null, null, [], [], species);

    return {
      agent: 'corridor',
      memoryUpdate: {
        candidateCorridors: corridors,
        corridorCount: corridors.length,
      },
      log: {
        level: 'info',
        message: `Corridor Planning Agent generated ${corridors.length} candidate corridor pathways using least-cost spatial alignment.`,
        metadata: {
          corridorsSummary: corridors.map((c) => ({
            title: c.title,
            distanceKm: c.distance,
            overallScore: c.overallScore,
            status: c.status,
          })),
        },
      },
    };
  }
}

module.exports = new CorridorPlannerAgent();
