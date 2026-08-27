const Workflow = require('../models/Workflow');
const aiService = require('./aiService');

class WorkflowService {
  async getAllWorkflows(filter = {}) {
    try {
      return await Workflow.find(filter).sort({ updatedAt: -1 });
    } catch (err) {
      return [];
    }
  }

  async getWorkflowById(id) {
    try {
      return await Workflow.findById(id);
    } catch (err) {
      return null;
    }
  }

  async createWorkflow(data) {
    return await Workflow.create(data);
  }

  async generateWorkflowFromAI(prompt, species) {
    const aiResult = await aiService.generateWorkflowFromPrompt(prompt, species);
    return await Workflow.create(aiResult);
  }

  async updateWorkflow(id, updateData) {
    return await Workflow.findByIdAndUpdate(id, updateData, { new: true });
  }

  async duplicateWorkflow(id) {
    const original = await Workflow.findById(id);
    if (!original) throw new Error('Workflow not found');

    const copyObj = original.toObject();
    delete copyObj._id;
    delete copyObj.createdAt;
    delete copyObj.updatedAt;
    copyObj.name = `${copyObj.name} (Copy)`;
    copyObj.version = 1;

    return await Workflow.create(copyObj);
  }

  async deleteWorkflow(id) {
    return await Workflow.findByIdAndDelete(id);
  }

  async getDashboardMetrics() {
    let totalWorkflows = 0;
    try { totalWorkflows = await Workflow.countDocuments(); } catch (e) {}
    
    return {
      totalHabitats: 14,
      wildlifeSpeciesCount: 4,
      corridorsAnalyzed: 18,
      highRiskAreasCount: 3,
      activeAnalyses: 2,
      completedAnalyses: 16,
      totalWorkflows,
    };
  }
}

module.exports = new WorkflowService();
