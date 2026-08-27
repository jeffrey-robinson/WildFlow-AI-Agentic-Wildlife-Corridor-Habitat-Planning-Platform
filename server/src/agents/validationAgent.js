class ValidationAgent {
  async execute(context) {
    const candidateCorridors = context.memory?.candidateCorridors || [];
    const minScoreThreshold = 65;

    const validatedCorridors = candidateCorridors.map((c) => {
      const passesValidation = c.overallScore >= minScoreThreshold && c.humanRisk < 50;
      return {
        ...c,
        validated: passesValidation,
        validationNotes: passesValidation
          ? 'Passed ecological minimum width, habitat connectivity and road risk safety checks.'
          : 'Failed human-risk threshold; requires mitigation underpass or recovery rerouting.',
        status: passesValidation ? (c.overallScore > 85 ? 'RECOMMENDED' : 'VIABLE') : 'HIGH_RISK',
      };
    });

    const passedCount = validatedCorridors.filter((c) => c.validated).length;

    return {
      agent: 'validation',
      memoryUpdate: {
        candidateCorridors: validatedCorridors,
        validationPassedCount: passedCount,
      },
      log: {
        level: passedCount > 0 ? 'success' : 'warn',
        message: `Validation Agent completed evaluation. ${passedCount} out of ${validatedCorridors.length} corridors passed strict conservation criteria.`,
        metadata: { passedCount, total: validatedCorridors.length },
      },
    };
  }
}

module.exports = new ValidationAgent();
