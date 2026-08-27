import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Trees,
  Brain,
  Compass,
  Map as MapIcon,
  ShieldCheck,
  ArrowRight,
  Activity,
  Network,
  Zap,
  Globe,
  Layers,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0b130e] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Landing Header Navigation */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-950/60">
            <Trees className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <span className="font-extrabold tracking-tight text-xl text-white">WildFlow AI</span>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-xs font-semibold text-slate-300 hover:text-emerald-400 px-4 py-2 transition"
          >
            Operator Sign In
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-950/60 transition flex items-center space-x-2"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-emerald-400 text-xs font-bold mb-8 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Agentic Wildlife Corridor & Habitat Planning Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Turn Natural Language Into AI-Powered Wildlife Habitat & Corridor Workflows
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
          Empowering conservation officers and environmental planners to evaluate forest fragmentation, compute least-cost corridor paths, and mitigate human-wildlife conflict using multi-agent AI and interactive GIS spatial analysis.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-emerald-950/80 transition flex items-center justify-center space-x-2"
          >
            <span>Open Conservation Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => router.push('/workflows/builder')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 border border-slate-700 hover:border-emerald-500 text-slate-200 font-bold text-sm rounded-2xl transition flex items-center justify-center space-x-2"
          >
            <Brain className="w-4 h-4 text-emerald-400" />
            <span>Try AI Prompt Generator</span>
          </button>
        </div>

        {/* Live Multi-Agent Pipeline Visualization Banner */}
        <div className="mt-16 p-6 rounded-3xl bg-[#0d1711] border border-emerald-900/40 shadow-2xl max-w-5xl mx-auto text-left">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40 mb-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-300">
                8-Agent Execution Architecture
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
              LangGraph + Turf.js GIS Engine
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { title: '1. Planner Agent', desc: 'Objective & Bounds' },
              { title: '2. Habitat Agent', desc: 'NDVI & Suitability' },
              { title: '3. Fragmentation', desc: 'Pinch Points & Gaps' },
              { title: '4. Corridor Agent', desc: 'Least-Cost Paths' },
              { title: '5. Risk Agent', desc: 'Highway & Village Conflicts' },
              { title: '6. Validation', desc: 'Ecological Criteria' },
              { title: '7. Recovery', desc: 'Auto-Rerouting' },
              { title: '8. Monitoring', desc: 'Decision Report' },
            ].map((step, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/60 text-xs">
                <span className="font-extrabold text-emerald-400 block">{step.title}</span>
                <span className="text-[11px] text-slate-400">{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-emerald-900/30">
        <h2 className="text-2xl font-black text-center text-white mb-12">
          State-of-the-Art Conservation Intelligence Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0d1711] border border-emerald-900/40 space-y-3">
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/30 w-fit text-purple-400">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Natural Language Workflows</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Describe conservation objectives in simple English. AI converts queries into executable React Flow node pipelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1711] border border-emerald-900/40 space-y-3">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/30 w-fit text-emerald-400">
              <MapIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Interactive GIS Platform</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-layer Leaflet spatial visualization with forest cover, telemetry sightings, water holes, highways, and corridors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1711] border border-emerald-900/40 space-y-3">
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/30 w-fit text-rose-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Decision-Support Reports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates rigorous reports with confidence scores, data sources, assumptions, and limitations for ecological review.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-900/40 py-8 text-center text-xs text-slate-500">
        WildFlow AI — Agentic Wildlife Corridor & Habitat Planning Platform © 2026. Built with Google DeepMind Antigravity.
      </footer>
    </div>
  );
}

function Sparkles(props) {
  return <Zap {...props} />;
}
