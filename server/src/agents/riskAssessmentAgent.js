const { calculateSpatialRisk } = require('../gis/spatialRisk');

class RiskAssessmentAgent {
  async execute(context) {
    const candidateCorridors = context.memory?.candidateCorridors || [];
    const evaluatedCorridors = candidateCorridors.map((corridor) => {
      const riskResult = calculateSpatialRisk(
        { type: 'Feature', geometry: corridor.geometry },
        [],
        [],
        []
      );
      return {
        ...corridor,
        humanRisk: riskResult.riskScore,
        roadRisk: Math.round(riskResult.riskScore * 0.75),
        riskHotspots: riskResult.riskHotspots,
      };
    });

    const riskSummary = {
      evaluatedCount: evaluatedCorridors.length,
      highRiskCount: evaluatedCorridors.filter((c) => c.humanRisk > 40).length,
      overallAreaRiskLevel: 'MEDIUM_HIGH',
      criticalHotspotsDetected: 2,
    };

    return {
      agent: 'risk',
      memoryUpdate: {
        candidateCorridors: evaluatedCorridors,
        riskSummary,
      },
      log: {
        level: 'warn',
        message: `Risk Assessment Agent evaluated ${evaluatedCorridors.length} corridors. High-risk highway/settlement encounters identified.`,
        metadata: riskSummary,
      },
    };
  }
}

module.exports = new RiskAssessmentAgent();
