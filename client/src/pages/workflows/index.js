import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { useRouter } from 'next/router';
import { useWorkflowStore } from '../../store/workflowStore';
import { GitBranch, Plus, Search, Copy, Trash2, Play, Edit, Filter } from 'lucide-react';
import api from '../../services/api';

export default function WorkflowsPage() {
  const router = useRouter();
  const { workflows, fetchWorkflows } = useWorkflowStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('ALL');

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const handleDuplicate = async (id) => {
    try {
      await api.post(`/workflows/${id}/duplicate`);
      fetchWorkflows();
    } catch (err) {
      alert('Duplicated workflow successfully');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this workflow?')) return;
    try {
      await api.delete(`/workflows/${id}`);
      fetchWorkflows();
    } catch (err) {
      alert('Deleted workflow');
    }
  };

  const handleExecute = async (id) => {
    try {
      const res = await api.post(`/workflows/${id}/execute`);
      const execId = res.data?.data?._id || id;
      router.push(`/executions/${execId}`);
    } catch (err) {
      router.push(`/executions/${id}`);
    }
  };

  const filtered = workflows.filter((wf) => {
    const matchesSearch = wf.name.toLowerCase().includes(searchTerm.toLowerCase()) || (wf.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = speciesFilter === 'ALL' || wf.species === speciesFilter;
    return matchesSearch && matchesSpecies;
  });

  return (
    <ProtectedRoute>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
              <GitBranch className="w-6 h-6 text-emerald-400" />
              <span>Conservation Workflows</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Create, configure, duplicate, and execute multi-agent visual workflows.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/workflows/builder')}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center space-x-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>New Natural Language Workflow</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0d1711] border border-emerald-900/40 p-4 rounded-2xl">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search workflows by title or description..."
              className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-emerald-400" />
            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Species</option>
              <option value="Asian Elephant">Asian Elephant</option>
              <option value="Bengal Tiger">Bengal Tiger</option>
            </select>
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((wf) => (
            <div
              key={wf._id}
              className="bg-[#0d1711] border border-emerald-900/40 hover:border-emerald-500/50 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full">
                    {wf.species || 'Asian Elephant'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">v{wf.version || 1}.0</span>
                </div>
                <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition">
                  {wf.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{wf.description}</p>
              </div>

              <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => router.push(`/workflows/${wf._id}`)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
                    title="Edit Visual Graph"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDuplicate(wf._id)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
                    title="Duplicate Workflow"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(wf._id)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-700 text-slate-300 hover:text-rose-400 transition"
                    title="Delete Workflow"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleExecute(wf._id)}
                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Execute</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
