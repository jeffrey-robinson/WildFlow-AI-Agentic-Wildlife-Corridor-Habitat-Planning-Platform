const Workflow = require('../models/Workflow');
const aiService = require('./aiService');

const mockWorkflowsMap = new Map([
  [
    'wf-sample-1',
    {
      _id: 'wf-sample-1',
      name: 'Elephant Nilgiri Corridor & Conflict Avoidance Analysis',
      description: 'Multi-agent analysis connecting Mudumalai core habitat to Bandipur reserve while mitigating highway crossings.',
      species: 'Asian Elephant',
      studyArea: 'Nilgiri Biosphere & Western Ghats Habitat Complex',
      status: 'ACTIVE',
      version: 1,
      nodes: [
        { id: 'node-1', type: 'plannerNode', position: { x: 100, y: 150 }, data: { label: 'Conservation Planner Agent', agentType: 'planner', species: 'Asian Elephant', status: 'idle' } },
        { id: 'node-2', type: 'habitatNode', position: { x: 380, y: 150 }, data: { label: 'Habitat Analysis Agent', agentType: 'habitat', ndviThreshold: 0.65, status: 'idle' } },
        { id: 'node-3', type: 'fragmentationNode', position: { x: 660, y: 150 }, data: { label: 'Fragmentation Agent', agentType: 'fragmentation', status: 'idle' } },
        { id: 'node-4', type: 'corridorNode', position: { x: 940, y: 150 }, data: { label: 'Corridor Planning Agent', agentType: 'corridor', maxCorridorDistanceKm: 45, status: 'idle' } },
        { id: 'node-5', type: 'riskNode', position: { x: 520, y: 350 }, data: { label: 'Risk Assessment Agent', agentType: 'risk', highwayWeight: 0.4, status: 'idle' } },
        { id: 'node-6', type: 'validationNode', position: { x: 800, y: 350 }, data: { label: 'Validation Agent', agentType: 'validation', status: 'idle' } },
        { id: 'node-7', type: 'recoveryNode', position: { x: 1080, y: 350 }, data: { label: 'Recovery Agent', agentType: 'recovery', status: 'idle' } },
        { id: 'node-8', type: 'monitoringNode', position: { x: 800, y: 550 }, data: { label: 'Monitoring Agent', agentType: 'monitoring', status: 'idle' } },
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
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    'wf-sample-2',
    {
      _id: 'wf-sample-2',
      name: 'Bengal Tiger Forest Fragmentation & Gap Study',
      description: 'Evaluates patch isolation and prey density corridors across Western Ghats Sector 4.',
      species: 'Bengal Tiger',
      studyArea: 'Western Ghats Ridge Complex',
      status: 'ACTIVE',
      version: 1,
      nodes: [],
      edges: [],
      updatedAt: new Date().toISOString(),
    },
  ],
]);

class WorkflowService {
  async getAllWorkflows(filter = {}) {
    try {
      const list = await Workflow.find(filter).sort({ updatedAt: -1 });
      if (list.length > 0) return list;
    } catch (err) {}

    return Array.from(mockWorkflowsMap.values());
  }

  async getWorkflowById(id) {
    if (mockWorkflowsMap.has(id)) {
      return mockWorkflowsMap.get(id);
    }
    try {
      const wf = await Workflow.findById(id);
      if (wf) return wf;
    } catch (err) {}

    return mockWorkflowsMap.get('wf-sample-1');
  }

  async createWorkflow(data) {
    try {
      return await Workflow.create(data);
    } catch (err) {
      const newId = `wf-${Date.now()}`;
      const newWf = {
        _id: newId,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      mockWorkflowsMap.set(newId, newWf);
      return newWf;
    }
  }

  async generateWorkflowFromAI(prompt, species) {
    const aiResult = await aiService.generateWorkflowFromPrompt(prompt, species);
    return await this.createWorkflow(aiResult);
  }

  async updateWorkflow(id, updateData) {
    if (mockWorkflowsMap.has(id)) {
      const existing = mockWorkflowsMap.get(id);
      const updated = { ...existing, ...updateData, updatedAt: new Date().toISOString() };
      mockWorkflowsMap.set(id, updated);
      return updated;
    }
    try {
      return await Workflow.findByIdAndUpdate(id, updateData, { new: true });
    } catch (err) {
      const updated = { _id: id, ...updateData, updatedAt: new Date().toISOString() };
      mockWorkflowsMap.set(id, updated);
      return updated;
    }
  }

  async duplicateWorkflow(id) {
    const original = await this.getWorkflowById(id);
    if (!original) throw new Error('Workflow not found');

    const copyObj = JSON.parse(JSON.stringify(original));
    delete copyObj._id;
    delete copyObj.createdAt;
    delete copyObj.updatedAt;
    copyObj.name = `${copyObj.name} (Copy)`;
    copyObj.version = 1;

    return await this.createWorkflow(copyObj);
  }

  async deleteWorkflow(id) {
    if (mockWorkflowsMap.has(id)) {
      mockWorkflowsMap.delete(id);
      return { success: true };
    }
    try {
      return await Workflow.findByIdAndDelete(id);
    } catch (err) {
      return { success: true };
    }
  }

  async getDashboardMetrics() {
    let totalWorkflows = mockWorkflowsMap.size;
    try { totalWorkflows = Math.max(totalWorkflows, await Workflow.countDocuments()); } catch (e) {}
    
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
