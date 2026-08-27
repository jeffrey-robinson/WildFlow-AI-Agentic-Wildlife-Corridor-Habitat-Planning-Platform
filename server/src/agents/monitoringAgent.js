const aiService = require('../services/aiService');

class MonitoringAgent {
  async execute(context) {
    const candidateCorridors = context.memory?.candidateCorridors || [];
    const riskSummary = context.memory?.riskSummary || {};

    const report = await aiService.generateConservationReport(context, candidateCorridors, riskSummary);

    return {
      agent: 'monitoring',
      memoryUpdate: {
        conservationReport: report,
        monitoringStatus: 'FINALIZED',
      },
      log: {
        level: 'success',
        message: `Monitoring Agent finalized multi-agent execution pipeline. Decision-support conservation report synthesized.`,
        metadata: {
          confidenceScore: report.confidenceScore,
          recommendedCorridor: report.recommendedCorridor?.title,
        },
      },
    };
  }
}

module.exports = new MonitoringAgent();
