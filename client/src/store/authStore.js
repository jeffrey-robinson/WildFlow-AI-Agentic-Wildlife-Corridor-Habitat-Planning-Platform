import { create } from 'zustand';
import api from '../services/api';

export const useAuthStore = create((set) => ({
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('wildflow_user') || 'null') : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('wildflow_token') || null : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('wildflow_token') : false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user, token } = res.data;
      localStorage.setItem('wildflow_token', token);
      localStorage.setItem('wildflow_user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true, loading: false });
      return user;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  register: async (name, email, password, role = 'operator') => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      const { user, token } = res.data;
      localStorage.setItem('wildflow_token', token);
      localStorage.setItem('wildflow_user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true, loading: false });
      return user;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Registration failed';
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wildflow_token');
      localStorage.removeItem('wildflow_user');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },

  setDemoUser: () => {
    const demoUser = {
      id: 'demo-user-id',
      name: 'Dr. Rajesh Sharma (Lead Wildlife Director)',
      email: 'admin@wildflow.ai',
      role: 'admin',
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('wildflow_token', 'demo_jwt_token_2026');
      localStorage.setItem('wildflow_user', JSON.stringify(demoUser));
    }
    set({ user: demoUser, token: 'demo_jwt_token_2026', isAuthenticated: true });
  },
}));
