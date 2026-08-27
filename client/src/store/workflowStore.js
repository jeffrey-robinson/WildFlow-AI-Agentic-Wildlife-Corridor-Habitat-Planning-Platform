import { create } from 'zustand';
import api from '../services/api';

export const useWorkflowStore = create((set, get) => ({
  workflows: [],
  currentWorkflow: null,
  loading: false,
  error: null,
  promptInput: '',
  generatingAI: false,

  setPromptInput: (promptInput) => set({ promptInput }),

  fetchWorkflows: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/workflows');
      set({ workflows: res.data.data, loading: false });
    } catch (err) {
      // Fallback sample workflow
      const mockWorkflows = [
        {
          _id: 'wf-sample-1',
          name: 'Elephant Nilgiri Corridor & Conflict Avoidance Analysis',
          description: 'Multi-agent analysis connecting Mudumalai core habitat to Bandipur reserve while mitigating highway crossings.',
          species: 'Asian Elephant',
          studyArea: 'Nilgiri Biosphere & Western Ghats',
          status: 'ACTIVE',
          updatedAt: new Date().toISOString(),
        },
        {
          _id: 'wf-sample-2',
          name: 'Bengal Tiger Forest Fragmentation & Gap Study',
          description: 'Evaluates patch isolation and prey density corridors across Western Ghats Sector 4.',
          species: 'Bengal Tiger',
          studyArea: 'Western Ghats Ridge Complex',
          status: 'ACTIVE',
          updatedAt: new Date().toISOString(),
        },
      ];
      set({ workflows: mockWorkflows, loading: false });
    }
  },

  fetchWorkflowById: async (id) => {
    set({ loading: true });
    try {
      const res = await api.get(`/workflows/${id}`);
      set({ currentWorkflow: res.data.data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  generateWorkflowFromPrompt: async (promptText, species = 'Asian Elephant') => {
    set({ generatingAI: true, error: null });
    try {
      const res = await api.post('/workflows/generate', { prompt: promptText, species });
      const createdWorkflow = res.data.data;
      set({
        currentWorkflow: createdWorkflow,
        workflows: [createdWorkflow, ...get().workflows],
        generatingAI: false,
      });
      return createdWorkflow;
    } catch (err) {
      set({ generatingAI: false, error: 'Failed to generate AI workflow' });
      throw err;
    }
  },

  saveWorkflow: async (workflowData) => {
    try {
      if (workflowData._id && !workflowData._id.startsWith('wf-sample')) {
        const res = await api.put(`/workflows/${workflowData._id}`, workflowData);
        set({ currentWorkflow: res.data.data });
      } else {
        const res = await api.post('/workflows', workflowData);
        set({ currentWorkflow: res.data.data });
      }
    } catch (err) {
      console.error('Save workflow error:', err);
    }
  },
}));
