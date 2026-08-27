import React, { useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import MetricCard from '../components/MetricGrid/MetricCard';
import { useRouter } from 'next/router';
import {
  Trees,
  Compass,
  AlertTriangle,
  Activity,
  PlaySquare,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Layers,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { useWorkflowStore } from '../store/workflowStore';

export default function DashboardPage() {
  const router = useRouter();
  const { workflows, fetchWorkflows, promptInput, setPromptInput, generateWorkflowFromPrompt } = useWorkflowStore();

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    try {
      const created = await generateWorkflowFromPrompt(promptInput);
      router.push(`/workflows/${created._id}`);
    } catch (err) {
      router.push('/workflows/builder');
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header & Quick Natural Language Prompt Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-3">
              <span>Conservation Operations Console</span>
              <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-mono">
                Nilgiri Biosphere Region
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time multi-agent habitat suitability, connectivity corridors, and human-wildlife risk monitoring.
            </p>
          </div>

          <button
            onClick={() => router.push('/map')}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center space-x-2 shrink-0"
          >
            <Layers className="w-4 h-4" />
            <span>Open Fullscreen GIS Map</span>
          </button>
        </div>

        {/* AI Natural Language Conservation Prompt Input Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#0d1711] to-emerald-950/60 border border-emerald-700/40 shadow-2xl space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <span className="font-extrabold text-xs uppercase tracking-wider">
              Natural Language Conservation Workflow Generator
            </span>
          </div>

          <form onSubmit={handlePromptSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-emerald-500/70 absolute left-4 top-3.5" />
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="e.g. Find three potential elephant corridors connecting two forest habitats while avoiding highways and villages..."
                className="w-full bg-slate-950/80 border border-emerald-800/50 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0"
            >
              <span>Generate Workflow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Forest Habitats"
            value="14"
            subtitle="Core Reserve Patches"
            icon={Trees}
            color="emerald"
            trend={{ positive: true, value: '82% High Canopy' }}
          />
          <MetricCard
            title="Wildlife Species"
            value="4"
            subtitle="Asian Elephant, Tiger, Gaur, Leopard"
            icon={Activity}
            color="purple"
            trend={{ positive: true, value: '7 Telemetry Tags' }}
          />
          <MetricCard
            title="Corridors Analyzed"
            value="18"
            subtitle="Connectivity Pathways"
            icon={Compass}
            color="amber"
            trend={{ positive: true, value: '3 Recommended' }}
          />
          <MetricCard
            title="High Risk Zones"
            value="3"
            subtitle="Highway & Village Intersections"
            icon={AlertTriangle}
            color="rose"
            trend={{ positive: false, value: 'CRITICAL HIGHWAY 17' }}
          />
        </div>

        {/* Two Column Layout: Recent Workflows & Corridor Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Workflows Panel */}
          <div className="lg:col-span-2 bg-[#0d1711] border border-emerald-900/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
              <h3 className="font-extrabold text-sm text-white flex items-center space-x-2">
                <PlaySquare className="w-4 h-4 text-emerald-400" />
                <span>Active Conservation Workflows</span>
              </h3>
              <button
                onClick={() => router.push('/workflows')}
                className="text-xs font-semibold text-emerald-400 hover:underline"
              >
                View All Workflows →
              </button>
            </div>

            <div className="space-y-3">
              {workflows.slice(0, 3).map((wf) => (
                <div
                  key={wf._id}
                  onClick={() => router.push(`/workflows/${wf._id}`)}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-600/60 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition">
                      {wf.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{wf.description}</p>
                    <div className="flex items-center space-x-2 mt-2 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {wf.species || 'Asian Elephant'}
                      </span>
                      <span className="text-slate-500">• {wf.studyArea || 'Nilgiri Biosphere'}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-emerald-950 border border-emerald-700/50 hover:bg-emerald-900 text-emerald-300 text-xs font-bold rounded-lg shrink-0">
                    Open Editor
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Corridor Recommendations Ranking Panel */}
          <div className="bg-[#0d1711] border border-emerald-900/40 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
              <h3 className="font-extrabold text-sm text-white flex items-center space-x-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Corridor Rankings</span>
              </h3>
              <button onClick={() => router.push('/corridors')} className="text-xs text-emerald-400 hover:underline">
                Manage
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-300">Corridor Alpha (Valley)</span>
                  <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700">
                    89/100
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[89%]"></div>
                </div>
                <p className="text-[10px] text-slate-400">Primary riverine alignment. Low settlement friction.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-cyan-300">Corridor Beta (Ridge)</span>
                  <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-700">
                    84/100
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[84%]"></div>
                </div>
                <p className="text-[10px] text-slate-400">Canopy ridge bypass avoiding Masinagudi village.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-300">Corridor Gamma (Agri)</span>
                  <span className="text-xs font-bold font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-700">
                    68/100
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[68%]"></div>
                </div>
                <p className="text-[10px] text-slate-400">Breaches Highway 17 with 55% road risk.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
