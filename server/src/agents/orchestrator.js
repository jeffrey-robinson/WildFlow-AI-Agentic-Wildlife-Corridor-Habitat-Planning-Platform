const { emitExecutionEvent } = require('../config/socket');
const Execution = require('../models/Execution');
const ExecutionLog = require('../models/ExecutionLog');
const AgentMemory = require('../models/AgentMemory');
const CorridorCandidate = require('../models/CorridorCandidate');

const plannerAgent = require('./conservationPlannerAgent');
const habitatAgent = require('./habitatAnalysisAgent');
const fragmentationAgent = require('./fragmentationAgent');
const corridorAgent = require('./corridorPlannerAgent');
const riskAgent = require('./riskAssessmentAgent');
const validationAgent = require('./validationAgent');
const recoveryAgent = require('./recoveryAgent');
const monitoringAgent = require('./monitoringAgent');

class MultiAgentOrchestrator {
  constructor() {
    this.agentsMap = {
      planner: plannerAgent,
      habitat: habitatAgent,
      fragmentation: fragmentationAgent,
      corridor: corridorAgent,
      risk: riskAgent,
      validation: validationAgent,
      recovery: recoveryAgent,
      monitoring: monitoringAgent,
    };
  }

  async runExecution(executionId) {
    console.log(`[MultiAgentOrchestrator]: Starting execution ${executionId}`);

    let execution = null;
    try {
      execution = await Execution.findById(executionId);
    } catch (err) {}

    if (!execution) {
      // In-memory dummy object if MongoDB is unavailable
      execution = {
        _id: executionId,
        workflowId: 'dummy-workflow-id',
        species: 'Asian Elephant',
        studyArea: 'Nilgiri Biosphere & Western Ghats',
        status: 'PENDING',
        inputs: {},
      };
    }

    execution.status = 'RUNNING';
    execution.startTime = new Date();
    try { await execution.save(); } catch (e) {}

    emitExecutionEvent(executionId, 'execution_status', {
      executionId,
      status: 'RUNNING',
      message: 'Multi-Agent pipeline initiated.',
    });

    const pipelineSteps = ['planner', 'habitat', 'fragmentation', 'corridor', 'risk', 'validation', 'recovery', 'monitoring'];
    let agentMemoryState = {};

    for (const stepAgentId of pipelineSteps) {
      const agentInstance = this.agentsMap[stepAgentId];
      if (!agentInstance) continue;

      execution.currentNode = stepAgentId;
      try { await execution.save(); } catch (e) {}

      emitExecutionEvent(executionId, 'agent_start', {
        executionId,
        agent: stepAgentId,
        message: `Agent ${stepAgentId.toUpperCase()} processing...`,
      });

      // Artificial small delay for real-time visual step streaming
      await new Promise((r) => setTimeout(r, 1500));

      try {
        const result = await agentInstance.execute({
          executionId,
          workflowSnapshot: execution.workflowSnapshot,
          species: execution.species,
          studyArea: execution.studyArea,
          memory: agentMemoryState,
        });

        // Update working memory
        if (result.memoryUpdate) {
          agentMemoryState = { ...agentMemoryState, ...result.memoryUpdate };
          for (const [key, val] of Object.entries(result.memoryUpdate)) {
            try {
              await AgentMemory.create({
                executionId: execution._id,
                workflowId: execution.workflowId,
                agentId: stepAgentId,
                key,
                value: val,
              });
            } catch (e) {}
          }
        }

        // Save execution log
        const logEntry = {
          executionId: execution._id,
          workflowId: execution.workflowId,
          agent: stepAgentId,
          level: result.log?.level || 'info',
          message: result.log?.message || `Step ${stepAgentId} finished.`,
          metadata: result.log?.metadata || {},
          timestamp: new Date(),
        };

        try {
          await ExecutionLog.create(logEntry);
        } catch (e) {}

        emitExecutionEvent(executionId, 'agent_complete', {
          executionId,
          agent: stepAgentId,
          log: logEntry,
          memoryUpdate: result.memoryUpdate,
        });

      } catch (agentErr) {
        console.error(`[Orchestrator Agent Error (${stepAgentId})]:`, agentErr);
        const errLog = {
          executionId: execution._id,
          agent: stepAgentId,
          level: 'error',
          message: `Agent ${stepAgentId} encountered an error: ${agentErr.message}`,
          timestamp: new Date(),
        };
        try { await ExecutionLog.create(errLog); } catch (e) {}

        emitExecutionEvent(executionId, 'agent_error', {
          executionId,
          agent: stepAgentId,
          error: agentErr.message,
        });
      }
    }

    // Persist calculated corridor candidates
    if (agentMemoryState.candidateCorridors) {
      for (const candidate of agentMemoryState.candidateCorridors) {
        try {
          await CorridorCandidate.create({
            executionId: execution._id,
            ...candidate,
          });
        } catch (e) {}
      }
    }

    execution.status = 'COMPLETED';
    execution.endTime = new Date();
    execution.duration = Math.round((execution.endTime - execution.startTime) / 1000);
    execution.outputs = {
      finalMemory: agentMemoryState,
      report: agentMemoryState.conservationReport,
      recommendedCorridor: agentMemoryState.candidateCorridors?.find((c) => c.status === 'RECOMMENDED'),
    };

    try { await execution.save(); } catch (e) {}

    emitExecutionEvent(executionId, 'execution_complete', {
      executionId,
      status: 'COMPLETED',
      duration: execution.duration,
      outputs: execution.outputs,
    });

    return execution;
  }
}

module.exports = new MultiAgentOrchestrator();
