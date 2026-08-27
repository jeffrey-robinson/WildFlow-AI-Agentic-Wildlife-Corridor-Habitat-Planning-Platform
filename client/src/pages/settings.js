import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { useAuthStore } from '../store/authStore';
import { Settings, Shield, Key, Cpu, CheckCircle2, User } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuthStore();

  return (
    <ProtectedRoute>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
            <Settings className="w-6 h-6 text-emerald-400" />
            <span>Platform Settings & Health</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage user roles, AI provider connections, and system monitoring status.
          </p>
        </div>

        {/* User Profile Box */}
        <div className="bg-[#0d1711] border border-emerald-900/40 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <User className="w-4 h-4 text-emerald-400" />
            <span>User Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block">Name</span>
              <span className="text-white font-bold">{user?.name || 'Dr. Rajesh Sharma'}</span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block">Email</span>
              <span className="text-white font-bold">{user?.email || 'admin@wildflow.ai'}</span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block">Role Authorization</span>
              <span className="text-emerald-400 font-bold uppercase">{user?.role || 'admin'}</span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block">Access Session</span>
              <span className="text-emerald-400 font-bold">Active JWT Authenticated</span>
            </div>
          </div>
        </div>

        {/* AI & System Health Box */}
        <div className="bg-[#0d1711] border border-emerald-900/40 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>AI Provider & System Infrastructure</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">OpenRouter & Gemini Generative AI Engine</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-800">
                ACTIVE / FALLBACK READY
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">Turf.js Vector GIS Calculation Engine</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">Socket.IO Real-Time Stream Server</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-800">
                PORT 5000 READY
              </span>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
