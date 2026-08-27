import React, { useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { useRouter } from 'next/router';
import { useExecutionStore } from '../../store/executionStore';
import { PlaySquare, Clock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ExecutionsPage() {
  const router = useRouter();
  const { executions, fetchExecutions } = useExecutionStore();

  useEffect(() => {
    fetchExecutions();
  }, [fetchExecutions]);

  return (
    <ProtectedRoute>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
            <PlaySquare className="w-6 h-6 text-emerald-400" />
            <span>Analysis Execution History</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit log of all multi-agent execution runs, statuses, durations, and decision reports.
          </p>
        </div>

        <div className="bg-[#0d1711] border border-emerald-900/40 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-emerald-900/40 bg-slate-900/60 text-emerald-400 text-xs uppercase font-mono">
                <th className="p-4">Execution ID</th>
                <th className="p-4">Species</th>
                <th className="p-4">Status</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Started At</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/20 text-xs">
              {(executions.length > 0 ? executions : [
                {
                  _id: '65f001122334455667788990',
                  species: 'Asian Elephant',
                  status: 'COMPLETED',
                  duration: 28,
                  createdAt: new Date().toISOString(),
                },
                {
                  _id: '65f001122334455667788991',
                  species: 'Bengal Tiger',
                  status: 'RUNNING',
                  duration: 12,
                  createdAt: new Date().toISOString(),
                },
              ]).map((ex) => (
                <tr key={ex._id} className="hover:bg-emerald-950/30 transition">
                  <td className="p-4 font-mono font-bold text-white">{ex._id}</td>
                  <td className="p-4 font-mono text-slate-300">{ex.species || 'Asian Elephant'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono ${
                      ex.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                    }`}>
                      {ex.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-cyan-400">{ex.duration || 28}s</td>
                  <td className="p-4 font-mono text-slate-400">{new Date(ex.createdAt).toLocaleString()}</td>
                  <td className="p-4">
                    <button
                      onClick={() => router.push(`/executions/${ex._id}`)}
                      className="px-3 py-1.5 bg-emerald-950 border border-emerald-700/50 hover:bg-emerald-900 text-emerald-300 text-xs font-bold rounded-lg flex items-center space-x-1"
                    >
                      <span>View Results</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
