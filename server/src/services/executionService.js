const Execution = require('../models/Execution');
const ExecutionLog = require('../models/ExecutionLog');
const Workflow = require('../models/Workflow');
const { addExecutionToQueue } = require('../queues/analysisQueue');

class ExecutionService {
  async executeWorkflow(workflowId, inputParams = {}) {
    const workflow = await Workflow.findById(workflowId);
    if (!workflow) throw new Error('Workflow not found');

    const execution = await Execution.create({
      workflowId: workflow._id,
      workflowSnapshot: workflow.toObject(),
      species: workflow.species,
      studyArea: workflow.studyArea,
      status: 'PENDING',
      inputs: inputParams,
    });

    // Queue analysis task
    await addExecutionToQueue(execution._id.toString());

    return execution;
  }

  async getAllExecutions(filter = {}) {
    try {
      return await Execution.find(filter).populate('workflowId', 'name species').sort({ createdAt: -1 });
    } catch (e) {
      return [];
    }
  }

  async getExecutionById(id) {
    try {
      return await Execution.findById(id).populate('workflowId');
    } catch (e) {
      return null;
    }
  }

  async getExecutionTimeline(executionId) {
    try {
      return await ExecutionLog.find({ executionId }).sort({ timestamp: 1 });
    } catch (e) {
      return [];
    }
  }

  async pauseExecution(id) {
    const execution = await Execution.findById(id);
    if (execution) {
      execution.status = 'PAUSED';
      await execution.save();
    }
    return execution;
  }

  async resumeExecution(id) {
    const execution = await Execution.findById(id);
    if (execution) {
      execution.status = 'RUNNING';
      await execution.save();
    }
    return execution;
  }

  async cancelExecution(id) {
    const execution = await Execution.findById(id);
    if (execution) {
      execution.status = 'CANCELLED';
      await execution.save();
    }
    return execution;
  }
}

module.exports = new ExecutionService();
