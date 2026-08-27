import React, { useEffect } from 'react';
import { useExecutionStore } from '../../store/executionStore';
import {
  Brain,
  Trees,
  Network,
  Compass,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Activity,
  Play,
  Pause,
  RotateCcw,
  XCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import api from '../../services/api';

const agentMeta = {
  planner: { name: 'Conservation Planner', icon: Brain, color: 'text-purple-400 border-purple-500/40 bg-purple-950/20' },
  habitat: { name: 'Habitat Analysis', icon: Trees, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' },
  fragmentation: { name: 'Fragmentation Agent', icon: Network, color: 'text-amber-400 border-amber-500/40 bg-amber-950/20' },
  corridor: { name: 'Corridor Planning', icon: Compass, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20' },
  risk: { name: 'Risk Assessment', icon: AlertTriangle, color: 'text-rose-400 border-rose-500/40 bg-rose-950/20' },
  validation: { name: 'Validation Agent', icon: CheckCircle2, color: 'text-green-400 border-green-500/40 bg-green-950/20' },
  recovery: { name: 'Recovery Agent', icon: RefreshCw, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/20' },
  monitoring: { name: 'Monitoring Agent', icon: Activity, color: 'text-teal-400 border-teal-500/40 bg-teal-950/20' },
};

export default function ExecutionTimeline({ executionId }) {
  const { activeExecution, timelineLogs, fetchExecutionDetails, subscribeToExecutionEvents, unsubscribeFromExecutionEvents } = useExecutionStore();

  useEffect(() => {
    if (executionId) {
      fetchExecutionDetails(executionId);
      subscribeToExecutionEvents(executionId);
    }
    return () => {
      if (executionId) unsubscribeFromExecutionEvents(executionId);
    };
  }, [executionId, fetchExecutionDetails, subscribeToExecutionEvents, unsubscribeFromExecutionEvents]);

  const handleAction = async (action) => {
    try {
      await api.post(`/executions/${executionId}/${action}`);
      fetchExecutionDetails(executionId);
    } catch (err) {
      console.error('Action error:', err);
    }
  };

  const isCompleted = activeExecution?.status === 'COMPLETED';

  return (
    <div className="bg-[#0d1711] border border-emerald-900/40 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Timeline Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-emerald-900/40 pb-5">
        <div>
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-extrabold text-white">Live Multi-Agent Execution Pipeline</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
              activeExecution?.status === 'RUNNING'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                : activeExecution?.status === 'COMPLETED'
                ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}>
              STATUS: {activeExecution?.status || 'RUNNING'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Socket.IO streaming event audit log across all 8 specialized conservation agents.
          </p>
        </div>

        {/* Execution Control Actions */}
        <div className="flex items-center space-x-2">
          {activeExecution?.status === 'RUNNING' && (
            <button
              onClick={() => handleAction('pause')}
              className="px-3 py-1.5 bg-amber-950/60 border border-amber-700/50 hover:bg-amber-900 text-amber-300 font-semibold text-xs rounded-xl flex items-center space-x-1.5 transition"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          )}

          {activeExecution?.status === 'PAUSED' && (
            <button
              onClick={() => handleAction('resume')}
              className="px-3 py-1.5 bg-emerald-950/60 border border-emerald-700/50 hover:bg-emerald-900 text-emerald-300 font-semibold text-xs rounded-xl flex items-center space-x-1.5 transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          )}

          <button
            onClick={() => handleAction('cancel')}
            className="px-3 py-1.5 bg-rose-950/60 border border-rose-800/50 hover:bg-rose-900 text-rose-300 font-semibold text-xs rounded-xl flex items-center space-x-1.5 transition"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      {/* Streamed Logs Feed */}
      <div className="space-y-3 relative before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-900/40">
        {timelineLogs.map((log, index) => {
          const meta = agentMeta[log.agent] || agentMeta.planner;
          const Icon = meta.icon;
          return (
            <div key={index} className="flex items-start space-x-4 relative z-10 animate-in fade-in slide-in-from-left-2">
              <div className={`w-12 h-12 rounded-2xl border ${meta.color} flex items-center justify-center shrink-0 shadow-lg`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">{meta.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center space-x-1">
                    <Clock className="w-3 h-3 inline mr-1 text-emerald-400" />
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">{log.message}</p>

                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <div className="mt-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/60 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                    {JSON.stringify(log.metadata, null, 2)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
