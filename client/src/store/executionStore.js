import { create } from 'zustand';
import api from '../services/api';
import { getSocket } from '../services/socket';

export const useExecutionStore = create((set, get) => ({
  executions: [],
  activeExecution: null,
  timelineLogs: [],
  liveMemory: {},
  loading: false,

  fetchExecutions: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/executions');
      set({ executions: res.data.data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  fetchExecutionDetails: async (executionId) => {
    set({ loading: true });
    try {
      const [exRes, timelineRes] = await Promise.all([
        api.get(`/executions/${executionId}`),
        api.get(`/executions/${executionId}/timeline`),
      ]);
      set({
        activeExecution: exRes.data.data,
        timelineLogs: timelineRes.data.data,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  subscribeToExecutionEvents: (executionId) => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit('join_execution', executionId);

    socket.on('agent_start', (data) => {
      if (data.executionId === executionId) {
        set((state) => ({
          activeExecution: state.activeExecution
            ? { ...state.activeExecution, currentNode: data.agent, status: 'RUNNING' }
            : null,
        }));
      }
    });

    socket.on('agent_complete', (data) => {
      if (data.executionId === executionId) {
        set((state) => ({
          timelineLogs: [...state.timelineLogs, data.log],
          liveMemory: { ...state.liveMemory, ...data.memoryUpdate },
        }));
      }
    });

    socket.on('execution_complete', (data) => {
      if (data.executionId === executionId) {
        set((state) => ({
          activeExecution: state.activeExecution
            ? { ...state.activeExecution, status: 'COMPLETED', outputs: data.outputs }
            : null,
        }));
      }
    });
  },

  unsubscribeFromExecutionEvents: (executionId) => {
    const socket = getSocket();
    if (socket) {
      socket.emit('leave_execution', executionId);
      socket.off('agent_start');
      socket.off('agent_complete');
      socket.off('execution_complete');
    }
  },
}));
